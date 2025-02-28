import {Tabs} from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="(tabs)/search"
                options={{
                    tabBarIcon: ({color}) => <MaterialIcons name="search" color={color} size={24}/>,
                    tabBarLabel: 'Search',
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="(tabs)/history"
                options={{
                    tabBarIcon: ({color}) => <MaterialIcons name="history" color={color} size={24}/>,
                    tabBarLabel: 'History',
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="(tabs)/profile"
                options={{
                    tabBarIcon: ({color}) => <MaterialIcons name="person" color={color} size={24}/>,
                    tabBarLabel: 'Profile',
                    headerShown: false
                }}
            />
        </Tabs>
    );
}