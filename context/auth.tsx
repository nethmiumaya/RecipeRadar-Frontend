import { useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { createContext } from 'react';
import {API_URL} from "../config";

interface User {
    id: string;
    name: string;
    email: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    signIn: (credentials: { email: string; password: string }) => Promise<void>;
    signUp: (credentials: { email: string; password: string; name: string }) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const storage = {
    async getItem(key: string): Promise<string | null> {
        if (Platform.OS === 'web') {
            return localStorage.getItem(key);
        }
        return SecureStore.getItemAsync(key);
    },
    async setItem(key: string, value: string): Promise<void> {
        if (Platform.OS === 'web') {
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    },
    async removeItem(key: string): Promise<void> {
        if (Platform.OS === 'web') {
            localStorage.removeItem(key);
        } else {
            await SecureStore.deleteItemAsync(key);
        }
    },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const userData = await storage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    };

    const signIn = async (credentials: { email: string; password: string }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, credentials);
            const { id, name, email, token } = response.data;
            const userWithToken = { id, name, email, token };
            await storage.setItem('user', JSON.stringify(userWithToken));
            setUser(userWithToken);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('Login failed: Endpoint not found');
            } else {
                console.error('Login failed:', error.message);
            }
            throw new Error('Invalid email or password');
        }
    };

    const signUp = async (credentials: { email: string; password: string; name: string }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, credentials);
            const { id, name, email, token } = response.data;
            const userWithToken = { id, name, email, token };
            await storage.setItem('user', JSON.stringify(userWithToken));
            setUser(userWithToken);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('Registration failed: Endpoint not found');
            } else {
                console.error('Registration failed:', error.message);
            }
            throw new Error('Registration failed. Please try again.');
        }
    };

    const signOut = async () => {
        await storage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};