import {create} from 'zustand';
import {recipeService} from '../../service/recipeService';
import {RecipeDetails} from '../../types/types';

interface User {
    id: string;
    name: string;
    email: string;
    token: string;
}

interface RecipeStore {
    recipes: RecipeDetails[];
    currentRecipe: RecipeDetails | null;
    loading: boolean;
    error: string | null;
    searchRecipes: (user: User, ingredients: string) => Promise<void>;
    getRecipeDetails: (id: number) => Promise<void>;
}

export const useRecipeStore = create<RecipeStore>((set) => ({
    recipes: [],
    currentRecipe: null,
    loading: false,
    error: null,

    searchRecipes: async (user, ingredients) => {
        try {
            set({loading: true, error: null});

            if (!user || !user.token) {
                throw new Error('User not authenticated or token missing');
            }

            const recipes = await recipeService.searchRecipes(user.token, ingredients);
            set({recipes, loading: false});
        } catch (error) {
            set({error: 'Failed to search recipes', loading: false});
        }
    },

    getRecipeDetails: async (id) => {
        try {
            set({loading: true, error: null});

            const recipe = await recipeService.getRecipeDetails(id);
            set({currentRecipe: recipe, loading: false});
        } catch (error) {
            set({error: 'Failed to get recipe details', loading: false});
        }
    }
}));