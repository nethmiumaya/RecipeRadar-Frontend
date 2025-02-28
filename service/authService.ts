import axios from 'axios';
import {API_URL} from '../config';
import {User} from '../types/types';

export const authService = {
    async signIn(credentials: { email: string; password: string }): Promise<User> {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    },
    async signUp(credentials: { email: string; password: string; name: string }): Promise<User> {
        const response = await axios.post(`${API_URL}/auth/register`, credentials);
        return response.data;
    },
};