import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useRecipeStore } from '../../store/recipes';
import RecipeCard from '../../components/RecipeCard';
import { Search, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SearchScreen() {
    const router = useRouter();
    const [ingredients, setIngredients] = useState('');
    const { recipes, searchRecipes, loading } = useRecipeStore();

    const handleSearch = () => {
        if (ingredients.trim()) {
            searchRecipes(ingredients);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#ff6b6b', '#ff8787']}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Find Recipes</Text>
                    <Text style={styles.subtitle}>Enter ingredients you have</Text>
                </View>
            </LinearGradient>

            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Search color="#666" size={20} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="e.g. chicken, rice, tomatoes"
                        value={ingredients}
                        onChangeText={setIngredients}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                        placeholderTextColor="#999"
                    />
                </View>
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <ChevronRight color="white" size={24} />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.messageContainer}>
                    <Text style={styles.message}>Finding delicious recipes...</Text>
                </View>
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <RecipeCard
                            recipe={item}
                            onPress={() => router.push(`/recipe/${item.id}`)}
                        />
                    )}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <View style={styles.messageContainer}>
                            <Text style={styles.message}>
                                No recipes found. Try searching with different ingredients!
                            </Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 48,
        paddingBottom: 32,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerContent: {
        paddingHorizontal: 24,
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: -24,
        marginBottom: 24,
        gap: 12,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 48,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 8,
        color: '#333',
    },
    searchButton: {
        backgroundColor: '#ff6b6b',
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    list: {
        padding: 16,
        gap: 16,
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    message: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        lineHeight: 24,
    },
});