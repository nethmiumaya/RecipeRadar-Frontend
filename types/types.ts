export interface Recipe {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
    servings: number;
    usedIngredientCount: number;
    missedIngredientCount: number;
}

export interface SearchHistoryItem {
    id: string;
    query: string;
    userId: string;
    createdAt: string;
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

export interface User {
    id: string;
    name: string;
    email: string;
    token: string;
}

export interface AuthContextType {
    user: User | null;
    signIn: (credentials: { email: string; password: string }) => Promise<void>;
    signUp: (credentials: { email: string; password: string; name: string }) => Promise<void>;
    signOut: () => Promise<void>;
}