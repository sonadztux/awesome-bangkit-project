export interface Ingredient {
  name: string
  amount: number
}

export interface IngredientCalorie {
  name: string
  calorie: number | null
}

export interface IngredientCalorieSummary extends Ingredient, IngredientCalorie {
  calorie_total: number | null
}

export interface Recipe {
  name: string
  ingredients: Ingredient[] | null
}

export interface RecipeCalorieSummary extends Recipe {
  ingredients: IngredientCalorieSummary[] | null
  calorie_total: number | null
}
