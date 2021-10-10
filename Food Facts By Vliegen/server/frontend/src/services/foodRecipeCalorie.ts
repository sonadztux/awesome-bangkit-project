import { createRequestForwarder } from '../utils/createRequestForwarder'

const FOOD_RECIPE_CALORIE_BASE_URL = process.env.FOOD_RECIPE_CALORIE_BASE_URL

export const postAnalyzeFood = createRequestForwarder(
  FOOD_RECIPE_CALORIE_BASE_URL + '/analyze-food'
)
