import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { dbService } from '../services/db';

export default function RootLayout() {
    const [loading, setLoading] = useState(true);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const validarSessao = async () => {
            try {
                const user = await dbService.session.get();
                const inAuthGroup = segments[0] === '(auth)';
                if (!user && !inAuthGroup) {
                    router.replace('/(auth)');
                } else if (user && inAuthGroup) {
                    router.replace('/(app)');
                }
            } catch {
                router.replace('/(auth)');
            } finally {
                setLoading(false);
            }
        };
        validarSessao();
    }, [segments]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    return <Slot />;
}