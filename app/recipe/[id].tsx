import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {useEffect} from 'react';
import {useRecipeStore} from '../../store/store';
import {Clock, Users, ChefHat} from 'lucide-react-native';
import {Ingredient} from '../../types/types';

export default function RecipeDetailsScreen() {
    const {id} = useLocalSearchParams();
    const {getRecipeDetails, currentRecipe, loading} = useRecipeStore();

    useEffect(() => {
        if (id) {
            getRecipeDetails(Number(id));
        }
    }, [id]);

    if (loading) {
        return <Text>Finding your recipe...</Text>;
    }

    if (!currentRecipe) {
        return <Text>Recipe not found</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{uri: currentRecipe.image}} style={styles.image}/>
            <View style={styles.content}>
                <Text style={styles.title}>{currentRecipe.title}</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Clock size={20} color="#666"/>
                        <Text style={styles.infoValue}>{currentRecipe.readyInMinutes || '30'} mins</Text>
                        <Text style={styles.infoLabel}>Time</Text>
                    </View>
                    <View style={styles.infoDivider}/>
                    <View style={styles.infoItem}>
                        <Users size={20} color="#666"/>
                        <Text style={styles.infoValue}>{currentRecipe.servings || '4'}</Text>
                        <Text style={styles.infoLabel}>Servings</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <ChefHat size={20} color="#666"/>
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                    </View>
                    {currentRecipe.extendedIngredients.map((ingredient: Ingredient, index: number) => (
                        <Text key={index} style={styles.ingredientText}>
                            • {ingredient.original}
                        </Text>
                    ))}
                </View>
                <View style={styles.section}>
                    <Text style={styles.instructions}>{currentRecipe.instructions}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        width: '100%',
        height: 300,
        backgroundColor: '#f0f0f0'
    },
    content: {
        flex: 1,
        marginTop: -24,
        paddingTop: 24,
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 24,
        lineHeight: 32
    },
    infoContainer: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        borderRadius: 16,
        padding: 16,
        marginBottom: 32
    },
    infoItem: {
        flex: 1,
        alignItems: 'center',
        gap: 4
    },
    infoDivider: {
        width: 1,
        backgroundColor: '#e0e0e0'
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 4
    },
    infoValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a'
    },
    section: {
        marginBottom: 32
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a1a1a'
    },
    ingredientText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24
    },
    instructions: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24
    }
});