import { View, Text, Image, ScrollView, StyleSheet, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { useRecipeStore } from '../../store/recipes';
import { Clock, Users, ChefHat } from 'lucide-react-native';

export default function RecipeDetailsScreen() {
    const { id } = useLocalSearchParams();
    const { getRecipeDetails, currentRecipe, loading } = useRecipeStore();

    useEffect(() => {
        if (id) {
            getRecipeDetails(Number(id));
        }
    }, [id]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loading}>Finding your recipe...</Text>
            </View>
        );
    }

    if (!currentRecipe) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.error}>Recipe not found</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} bounces={false}>
            <Image
                source={{ uri: currentRecipe.image }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.content}>
                <Text style={styles.title}>{currentRecipe.title}</Text>

                <View style={styles.infoContainer}>
                    <View style={styles.infoItem}>
                        <Clock size={20} color="#666" />
                        <Text style={styles.infoLabel}>Time</Text>
                        <Text style={styles.infoValue}>{currentRecipe.readyInMinutes} mins</Text>
                    </View>
                    <View style={[styles.infoItem, styles.infoDivider]} />
                    <View style={styles.infoItem}>
                        <Users size={20} color="#666" />
                        <Text style={styles.infoLabel}>Servings</Text>
                        <Text style={styles.infoValue}>{currentRecipe.servings}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <ChefHat size={20} color="#1a1a1a" />
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                    </View>
                    {currentRecipe.extendedIngredients.map((ingredient, index) => (
                        <View key={index} style={styles.ingredient}>
                            <Text style={styles.ingredientText}>
                                • {ingredient.original}
                            </Text>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Instructions</Text>
                    <Text style={styles.instructions}>{currentRecipe.instructions}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 300,
        backgroundColor: '#f0f0f0',
    },
    content: {
        flex: 1,
        marginTop: -24,
        paddingTop: 24,
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 24,
        lineHeight: 32,
    },
    infoContainer: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        borderRadius: 16,
        padding: 16,
        marginBottom: 32,
    },
    infoItem: {
        flex: 1,
        alignItems: 'center',
        gap: 4,
    },
    infoDivider: {
        width: 1,
        backgroundColor: '#e0e0e0',
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    infoValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    ingredient: {
        marginBottom: 12,
    },
    ingredientText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    instructions: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    loading: {
        fontSize: 16,
        color: '#666',
    },
    error: {
        fontSize: 16,
        color: '#ff6b6b',
    },
});