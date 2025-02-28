import axios from 'axios';
import { API_URL } from '../config';
import { RecipeDetails } from '../types/types';

export const recipeService = {
    async searchRecipes(userToken: string, ingredients: string): Promise<RecipeDetails[]> {
        const response = await axios.get(`${API_URL}/recipes/search`, {
            params: { ingredients },
            headers: { Authorization: `Bearer ${userToken}` }
        });
        return response.data;
    },
    async getRecipeDetails(id: number): Promise<RecipeDetails> {
        const apiKey = '4d0a224169d642f9ae249cf2f4d1de15';
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: { apiKey }
        });
        return response.data;
    }
};