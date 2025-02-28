import {View, Text, Image, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {Clock, Users} from 'lucide-react-native';
import {Recipe} from "../types/types";

interface RecipeCardProps {
    recipe: Recipe;
    onPress: () => void;
}

export default function RecipeCard({recipe, onPress}: RecipeCardProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={{uri: recipe.image}} style={styles.image}/>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>
                    {recipe.title}
                </Text>
                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <Clock size={16} color="#666"/>
                        <Text style={styles.statText}>
                            {recipe.readyInMinutes || '30'} mins
                        </Text>
                    </View>
                    <View style={styles.stat}>
                        <Users size={16} color="#666"/>
                        <Text style={styles.statText}>
                            {recipe.servings || '4'} servings
                        </Text>
                    </View>
                </View>
                <View style={styles.ingredients}>
                    <Text style={styles.ingredientCount}>
                        {recipe.usedIngredientCount} ingredients matched
                    </Text>
                    {recipe.missedIngredientCount > 0 && (
                        <Text style={styles.missedCount}>
                            {recipe.missedIngredientCount} needed
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: '#f0f0f0',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
        lineHeight: 24,
    },
    stats: {
        flexDirection: 'row',
        marginBottom: 12,
        gap: 16,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontSize: 14,
        color: '#666',
    },
    ingredients: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    ingredientCount: {
        fontSize: 14,
        color: '#22c55e',
        fontWeight: '500',
    },
    missedCount: {
        fontSize: 14,
        color: '#2E7D32',
        fontWeight: '500',
    },
});