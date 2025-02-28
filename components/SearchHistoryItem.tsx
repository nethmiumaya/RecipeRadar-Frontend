import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {History} from 'lucide-react-native';

interface SearchHistoryItemProps {
    query: { id: string; query: string; userId: string; createdAt: string };
    onPress: () => void;
}

export default function SearchHistoryItem({query, onPress}: SearchHistoryItemProps) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <History size={20} color="#666"/>
            <Text style={styles.text}>{query.query}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        gap: 12
    },
    text: {
        fontSize: 16,
        color: '#333'
    }
});