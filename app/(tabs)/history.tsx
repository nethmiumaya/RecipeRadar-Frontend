import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useRecipeStore } from '../../store/recipes';
import SearchHistoryItem from '../../components/SearchHistoryItem';

export default function HistoryScreen() {
    const router = useRouter();
    const { searchHistory } = useRecipeStore();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search History</Text>
            <FlatList
                data={searchHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <SearchHistoryItem
                        query={item}
                        onPress={() => {
                            router.push({
                                pathname: '/(tabs)',
                                params: { ingredients: item },
                            });
                        }}
                    />
                )}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No search history yet</Text>
                }
            />
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
    list: {
        gap: 12,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        marginTop: 24,
    },
});