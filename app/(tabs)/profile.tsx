import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';
import {useAuth} from '../../context/auth';

export default function ProfileScreen() {
    const router = useRouter();
    const {user, signOut} = useAuth();

    const handleSignOut = async () => {
        await signOut();
        router.replace('/login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.userInfo}>
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginTop: 60,
        marginBottom: 24,
    },
    userInfo: {
        backgroundColor: '#f8f8f8',
        padding: 20,
        borderRadius: 12,
        marginBottom: 24,
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    button: {
        height: 50,
        backgroundColor: '#2E7D32',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});