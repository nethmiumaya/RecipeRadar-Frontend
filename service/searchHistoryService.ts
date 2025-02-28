import axios from 'axios';
import {API_URL} from '../config';
import {User, SearchHistoryItem} from '../types/types';

export const searchHistoryService = {
    async fetchSearchHistory(user: User): Promise<SearchHistoryItem[]> {
        const response = await axios.get(`${API_URL}/recipes/history`, {
            headers: {Authorization: `Bearer ${user.token}`}
        });
        return response.data;
    }
};