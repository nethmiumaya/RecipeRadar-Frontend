import { Tabs } from 'expo-router';
import { Search, History, User } from 'lucide-react-native';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="(tabs)/search"
                options={{
                    tabBarIcon: ({ color }) => <Search color={color} size={24} />,
                    tabBarLabel: 'Search',
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="(tabs)/history"
                options={{
                    tabBarIcon: ({ color }) => <History color={color} size={24} />,
                    tabBarLabel: 'History',
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="(tabs)/profile"
                options={{
                    tabBarIcon: ({ color }) => <User color={color} size={24} />,
                    tabBarLabel: 'Profile',
                    headerShown: false
                }}
            />
        </Tabs>
    );
}