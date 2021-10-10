import express from 'express'

import * as db from './db'
import { RecipeCalorieSummary } from './db/models'

import validateRequest from './middlewares/validateRequest'

import createResponseBody from './utils/createResponseBody'

const app = express()
const PORT = process.env.PORT ?? 8080

app.use(express.json({ limit: '2mb' }))
app.use(validateRequest)

app.post('/analyze-food', async function (req: express.Request, res: express.Response) {
  try {
    const foodName: string = await db.getFoodNameFromImage(req.body.image)
    const recipe = await db.getFoodRecipe(foodName)

    const recipeCalorieSummary: RecipeCalorieSummary = {
      ...(recipe as RecipeCalorieSummary),
      calorie_total: null,
    }
    if (recipeCalorieSummary.ingredients === null) {
      res.json(createResponseBody(200, '', recipeCalorieSummary))
      return
    }

    const ingredientsName: string[] = []
    recipeCalorieSummary.ingredients.forEach((ingredient) => {
      ingredientsName.push(ingredient.name)
    })

    const ingredientsCalorie = await db.getIngredientsCalorie(ingredientsName)

    const recipeIngredientWithCalorie = [...recipeCalorieSummary.ingredients]
    let currentRecipeIngredientIndex = 0

    ingredientsCalorie.forEach((ingredientCalorieInfo) => {
      const ingredientCalorieTotal =
        ingredientCalorieInfo.calorie !== null
          ? (recipeIngredientWithCalorie[currentRecipeIngredientIndex].amount / 100) *
            ingredientCalorieInfo.calorie
          : null

      while (
        ingredientCalorieInfo.name !==
        recipeIngredientWithCalorie[currentRecipeIngredientIndex].name
      ) {
        currentRecipeIngredientIndex++
      }

      recipeIngredientWithCalorie[currentRecipeIngredientIndex] = {
        ...recipeIngredientWithCalorie[currentRecipeIngredientIndex],
        ...ingredientCalorieInfo,
        calorie_total: ingredientCalorieTotal,
      }

      if (recipeCalorieSummary.calorie_total === null) recipeCalorieSummary.calorie_total = 0
      recipeCalorieSummary.calorie_total += ingredientCalorieTotal ?? 0
    })

    recipeCalorieSummary.ingredients = recipeIngredientWithCalorie

    res.json(createResponseBody(200, '', recipeCalorieSummary))
  } catch (err) {
    console.log(err.message)
    res.json(
      createResponseBody(
        500,
        'There is error when processing your request, please try again later.',
        null
      )
    )
  }
})

app.listen(PORT, () => {
  console.log(`[server]: Server is running at https://localhost:${PORT}`)
})
