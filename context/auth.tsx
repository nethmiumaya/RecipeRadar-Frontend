import { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    signIn: (credentials: { email: string; password: string }) => Promise<void>;
    signUp: (credentials: {
        email: string;
        password: string;
        name: string;
    }) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Storage helper that works on both web and native
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
        // TODO: Implement actual API call
        const mockUser = {
            id: '1',
            name: 'John Doe',
            email: credentials.email,
        };
        await storage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
    };

    const signUp = async (credentials: {
        email: string;
        password: string;
        name: string;
    }) => {
        // TODO: Implement actual API call
        const mockUser = {
            id: '1',
            name: credentials.name,
            email: credentials.email,
        };
        await storage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
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