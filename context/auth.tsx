import {createContext, useContext, useState, useEffect} from 'react';
import {AuthContextType, User} from '../types/types';
import {storage} from '../storage/storage';
import {authService} from '../service/authService';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({children}: { children: React.ReactNode }) {
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
        const userWithToken = await authService.signIn(credentials);
        await storage.setItem('user', JSON.stringify(userWithToken));
        setUser(userWithToken);
    };

    const signUp = async (credentials: { email: string; password: string; name: string }) => {
        const userWithToken = await authService.signUp(credentials);
        await storage.setItem('user', JSON.stringify(userWithToken));
        setUser(userWithToken);
    };

    const signOut = async () => {
        await storage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, signIn, signUp, signOut}}>
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