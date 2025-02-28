import {useEffect, useState} from 'react';
import {View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';
import {useAuth} from '../../context/auth';
import RecipeCard from '../../components/RecipeCard';
import {Search} from 'lucide-react-native';
import {useRecipeStore} from '../../store/slices/recipeSlice';
import {useSearchHistoryStore} from '../../store/slices/searchHistorySlice';

export default function SearchScreen() {
    const router = useRouter();
    const {user} = useAuth();
    const [ingredients, setIngredients] = useState('');
    const {recipes, searchRecipes, loading} = useRecipeStore();
    const {fetchSearchHistory} = useSearchHistoryStore();

    useEffect(() => {
        if (user) {
            fetchSearchHistory(user);
        }
    }, [user]);

    const handleSearch = () => {
        if (ingredients.trim() && user) {
            searchRecipes(user, ingredients);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Find Recipes</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter ingredients you have"
                    value={ingredients}
                    onChangeText={setIngredients}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Search color="#fff" size={24}/>
                </TouchableOpacity>
            </View>

            {loading ? (
                <Text>Finding delicious recipes...</Text>
            ) : (
                <FlatList
                    data={recipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <RecipeCard
                            recipe={item}
                            onPress={() => router.push(`/recipe/${item.id}`)}
                        />
                    )}
                    contentContainerStyle={styles.list}
                    ListEmptyComponent={
                        <Text>No recipes found. Try searching with different ingredients!</Text>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1a1a1a',
        margin: 20
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 12
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8
    },
    searchButton: {
        backgroundColor: '#2E7D32',
        padding: 10,
        borderRadius: 8
    },
    list: {
        padding: 16,
        gap: 16
    }
});