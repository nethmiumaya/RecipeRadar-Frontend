import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {AuthProvider, useAuth} from '../context/auth';
import {useEffect} from 'react';
import {Redirect, useSegments, useRouter} from 'expo-router';

function useProtectedRoute() {
    const segments = useSegments();
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] === '(auth)';

        if (!user && !inAuthGroup) {
            router.replace('/login');
        } else if (user && inAuthGroup) {
            router.replace('/(tabs)');
        }
    }, [user, segments]);
}

function RootLayoutNav() {
    useProtectedRoute();

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(auth)" options={{headerShown: false}}/>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="recipe/[id]" options={{presentation: 'modal'}}/>
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutNav/>
            <StatusBar style="auto"/>
        </AuthProvider>
    );
}