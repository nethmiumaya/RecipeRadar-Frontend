import { create } from 'zustand';
import axios from 'axios';

interface RecipeStore {
    recipes: any[];
    currentRecipe: any | null;
    searchHistory: string[];
    loading: boolean;
    error: string | null;
    searchRecipes: (ingredients: string) => Promise<void>;
    getRecipeDetails: (id: number) => Promise<void>;
}

export const useRecipeStore = create<RecipeStore>((set, get) => ({
    recipes: [],
    currentRecipe: null,
    searchHistory: [],
    loading: false,
    error: null,

    searchRecipes: async (ingredients: string) => {
        try {
            set({ loading: true, error: null });

            const apiKey = '4d0a224169d642f9ae249cf2f4d1de15';
            const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
                params: { ingredients, apiKey }
            });

            set((state) => ({
                recipes: response.data,
                searchHistory: [ingredients, ...state.searchHistory],
                loading: false
            }));
        } catch (error) {
            set({
                error: 'Failed to search recipes',
                loading: false
            });
        }
    },

    getRecipeDetails: async (id: number) => {
        try {
            set({ loading: true, error: null });

            const apiKey = '4d0a224169d642f9ae249cf2f4d1de15';
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
                params: { apiKey }
            });

            set({
                currentRecipe: response.data,
                loading: false
            });
        } catch (error) {
            set({
                error: 'Failed to get recipe details',
                loading: false
            });
        }
    }
}));