import { useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {createContext} from "react";

interface User {
    id: string;
    name: string;
    email: string;
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
            localStorage.setItem(key, value);
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
            const response = await axios.post('http://localhost:3000/api/auth/login', credentials);
            const { token } = response.data;

            const userResponse = await axios.get('http://localhost:3000/api/auth/users', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const userData = userResponse.data[0];
            if (!userData) {
                throw new Error('User not found');
            }

            await storage.setItem('user', JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Invalid email or password');
        }
    };

    const signUp = async (credentials: { email: string; password: string; name: string }) => {
        await axios.post('http://localhost:3000/api/auth/register', credentials);
        const user = { id: '1', name: credentials.name, email: credentials.email }; // Mock user for now
        await storage.setItem('user', JSON.stringify(user));
        setUser(user);
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