import {create} from 'zustand';
import {searchHistoryService} from '../../service/searchHistoryService';
import {User, SearchHistoryItem} from '../../types/types';

interface SearchHistoryStore {
    searchHistory: SearchHistoryItem[];
    loading: boolean;
    error: string | null;
    fetchSearchHistory: (user: User) => Promise<void>;
}

export const useSearchHistoryStore = create<SearchHistoryStore>((set) => ({
    searchHistory: [],
    loading: false,
    error: null,

    fetchSearchHistory: async (user) => {
        try {
            set({loading: true, error: null});

            if (!user || !user.token) {
                throw new Error('User not authenticated or token missing');
            }

            const searchHistory = await searchHistoryService.fetchSearchHistory(user);
            set({searchHistory, loading: false});
        } catch (error) {
            set({error: 'Failed to fetch search history', loading: false});
        }
    }
}));