import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useRouter} from 'expo-router';
import {Mail, Lock} from 'lucide-react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useAuth} from "../../context/auth";
import {useState} from "react";

export default function LoginScreen() {
    const router = useRouter();
    const {signIn} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            setError('');
            if (!email || !password) {
                setError('Please fill in all fields');
                return;
            }
            await signIn({email, password});
            router.replace('/(tabs)');
        } catch (error) {
            setError('Invalid email or password');
        }
    };
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#4CAF50', '#66BB6A']}
                style={styles.header}
            >
                <Image
                    source={{uri: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=800&auto=format&fit=crop'}}
                    style={styles.headerImage}
                />
                <View style={styles.overlay}/>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to explore healthy recipes</Text>
            </LinearGradient>

            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Mail size={20} color="#2E7D32"/>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        placeholderTextColor="#666"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Lock size={20} color="#2E7D32"/>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#666"
                    />
                </View>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <Text style={styles.orText}>or continue with</Text>

                <TouchableOpacity onPress={() => router.push('/register')}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.registerText}>Don't have an account? Sign up</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5E9',
    },
    header: {
        height: 300,
        justifyContent: 'flex-end',
        padding: 24,
        paddingBottom: 48,
    },
    headerImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(76, 175, 80, 0.8)',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    form: {
        flex: 1,
        marginTop: -24,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        width: '100%',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        height: 56,
        width: '100%',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    orText: {
        marginVertical: 16,
        color: '#666',
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    socialIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    registerText: {
        marginTop: 16,
        color: '#2E7D32',
        fontWeight: 'bold',
    },
    error: {
        color: '#ff6b6b',
        marginBottom: 16,
        textAlign: 'center',
    },
});
