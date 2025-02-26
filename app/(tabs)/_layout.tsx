import { Tabs } from 'expo-router';
import { Search, History, User } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: Platform.OS === 'ios' ? 24 : 16,
                    left: 16,
                    right: 16,
                    borderRadius: 24,
                    height: 64,
                    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.8)' : 'white',
                    borderTopWidth: 0,
                    elevation: 4,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                },
                tabBarBackground: Platform.OS === 'ios' ? () => (
                    <BlurView tint="light" intensity={80} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 24,
                    }}/>
                ) : undefined,
                tabBarActiveTintColor: '#ff6b6b',
                tabBarInactiveTintColor: '#666',
                tabBarItemStyle: {
                    paddingVertical: 8,
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'History',
                    tabBarIcon: ({ color, size }) => <History size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}