import { create } from 'zustand';
import axios from 'axios';

interface User {
    id: string;
    name: string;
    email: string;
    token: string;
}

interface SearchHistoryItem {
    id: string;
    query: string;
    userId: string;
    createdAt: string;
}

interface RecipeStore {
    recipes: any[];
    currentRecipe: any | null;
    searchHistory: SearchHistoryItem[];
    loading: boolean;
    error: string | null;
    searchRecipes: (user: User, ingredients: string) => Promise<void>;
    getRecipeDetails: (id: number) => Promise<void>;
    fetchSearchHistory: (user: User) => Promise<void>;
}

export const useRecipeStore = create<RecipeStore>((set, get) => ({
    recipes: [],
    currentRecipe: null,
    searchHistory: [],
    loading: false,
    error: null,

    searchRecipes: async (user, ingredients) => {
        try {
            set({ loading: true, error: null });

            if (!user || !user.token) {
                throw new Error('User not authenticated or token missing');
            }

            const response = await axios.get('http://localhost:3000/api/recipes/search', {
                params: { ingredients },
                headers: { Authorization: `Bearer ${user.token}` }
            });

            const newSearchHistoryItem: SearchHistoryItem = {
                id: new Date().toISOString(),
                query: ingredients,
                userId: user.id,
                createdAt: new Date().toISOString()
            };

            set((state) => ({
                recipes: response.data,
                searchHistory: [newSearchHistoryItem, ...state.searchHistory],
                loading: false
            }));
        } catch (error) {
            set({
                error: 'Failed to search recipes',
                loading: false
            });
        }
    },

    getRecipeDetails: async (id) => {
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
    },

    fetchSearchHistory: async (user) => {
        try {
            set({ loading: true, error: null });

            if (!user || !user.token) {
                throw new Error('User not authenticated or token missing');
            }

            const response = await axios.get('http://localhost:3000/api/recipes/history', {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            set({
                searchHistory: response.data,
                loading: false
            });
        } catch (error) {
            set({
                error: 'Failed to fetch search history',
                loading: false
            });
        }
    }
}));