export interface Recipe {
    id: number;
    title: string;
    image: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
}

export interface Ingredient {
    id: number;
    original: string;
    amount: number;
    unit: string;
}

export interface RecipeDetails extends Recipe {
    instructions: string;
    extendedIngredients: Ingredient[];
    readyInMinutes: number;
    servings: number;
}