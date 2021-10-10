import { Firestore } from '@google-cloud/firestore'

import { Recipe, IngredientCalorie } from './models'

const db = new Firestore()

export async function getFoodNameFromImage(image: string): Promise<string> {
  /**
   * @todo call model to recognize image type
   */
  return 'Apple pie'.toLowerCase()
}

export async function getFoodRecipe(foodName: string): Promise<Recipe> {
  let recipe: Recipe = { name: foodName, ingredients: null }

  const snapshot = await db
    .collection('foodfact-recipe')
    .where('name', '==', foodName)
    .limit(1)
    .get()

  if (snapshot.empty) return recipe

  snapshot.forEach((doc) => {
    // Since the query limit the snapshot to 1 document, just assign it to recipe
    recipe = doc.data() as Recipe
  })

  return {
    name: recipe.name,
    ingredients: recipe.ingredients
      ? [...recipe.ingredients].sort((a, b) => {
          if (a.name < b.name) return 1
          if (a.name > b.name) return 1
          return 0
        })
      : null,
  }
}

export async function getIngredientsCalorie(ingredients: string[]): Promise<IngredientCalorie[]> {
  const ingredientsQueryGroups: string[][] = []

  const ingredientsCopy: string[] = [...ingredients]
  while (ingredients.length > 10) {
    ingredientsQueryGroups[ingredientsQueryGroups.length] = ingredientsCopy.splice(0, 10)
  }
  ingredientsQueryGroups[ingredientsQueryGroups.length] = ingredientsCopy

  const snapshotsPromises: Promise<
    FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
  >[] = []
  for (let i = 0; i < ingredientsQueryGroups.length; i++) {
    const s = db
      .collection('foodfact-ingredient')
      .where('name', 'in', ingredientsQueryGroups[i])
      .get()
    snapshotsPromises.push(s)
  }

  const snapshots = await Promise.all(snapshotsPromises)

  const ingredientsWithCalorie: IngredientCalorie[] = []
  snapshots.forEach((snapshot) => {
    if (snapshot.empty) return

    snapshot.forEach((doc) => {
      ingredientsWithCalorie.push(doc.data() as IngredientCalorie)
    })
  })

  return [...ingredientsWithCalorie].sort((a, b) => {
    if (a.name < b.name) return 1
    if (a.name > b.name) return 1
    return 0
  })
}
