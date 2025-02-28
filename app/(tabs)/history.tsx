import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';
import {useAuth} from '../../context/auth';
import SearchHistoryItem from '../../components/SearchHistoryItem';
import {useEffect} from 'react';
import {useSearchHistoryStore} from '../../store/slices/searchHistorySlice';

export default function HistoryScreen() {
    const router = useRouter();
    const {user} = useAuth();
    const {searchHistory, fetchSearchHistory} = useSearchHistoryStore();

    useEffect(() => {
        if (user) {
            fetchSearchHistory(user);
        }
    }, [user]);

    const renderItem = ({item}: { item: { id: string; query: string; userId: string; createdAt: string } }) => (
        <SearchHistoryItem
            query={item}
            onPress={() => router.push(`/recipe/${Number(item.id)}`)}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search History</Text>
            <FlatList
                data={searchHistory}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={<Text style={styles.emptyText}>No search history found.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginTop: 60,
        marginBottom: 24
    },
    list: {
        gap: 12
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
        marginTop: 24
    }
});