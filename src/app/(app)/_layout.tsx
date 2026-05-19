import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#2563EB',
            tabBarInactiveTintColor: '#9CA3AF',
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerShadowVisible: false,
            headerTitleStyle: { fontWeight: 'bold' }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Bater Ponto',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="fingerprint" color={color} size={size} />
                }}
            />
            <Tabs.Screen
                name="registros"
                options={{
                    title: 'Histórico',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="history" color={color} size={size} />
                }}
            />
            <Tabs.Screen
                name="mapa"
                options={{
                    title: 'Mapa',
                    tabBarIcon: ({ color, size }) => <MaterialIcons name="map" color={color} size={size} />
                }}
            />
        </Tabs>
    );
}