import { create } from 'zustand';
import axios from 'axios';
import { Recipe, RecipeDetails } from '../types/recipe';

const API_KEY = 'YOUR_SPOONACULAR_API_KEY'; // Replace with your actual API key
const API_URL = 'https://api.spoonacular.com/recipes';

interface RecipeStore {
    recipes: Recipe[];
    currentRecipe: RecipeDetails | null;
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
            const response = await axios.get(`${API_URL}/findByIngredients`, {
                params: {
                    apiKey: API_KEY,
                    ingredients,
                    number: 10,
                    ranking: 2,
                    ignorePantry: true,
                },
            });
            set((state) => ({
                recipes: response.data,
                searchHistory: [ingredients, ...state.searchHistory],
                loading: false,
            }));
        } catch (error) {
            set({
                error: 'Failed to search recipes',
                loading: false,
            });
        }
    },

    getRecipeDetails: async (id: number) => {
        try {
            set({ loading: true, error: null });
            const response = await axios.get(`${API_URL}/${id}/information`, {
                params: {
                    apiKey: API_KEY,
                },
            });
            set({
                currentRecipe: response.data,
                loading: false,
            });
        } catch (error) {
            set({
                error: 'Failed to get recipe details',
                loading: false,
            });
        }
    },
}));