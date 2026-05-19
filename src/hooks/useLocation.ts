import * as Location from 'expo-location';
import { useState } from 'react';

export function useLocation() {
    const [loading, setLoading] = useState(false);

    const solicitarLocalizacao = async (): Promise<{ latitude: number; longitude: number }> => {
        setLoading(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                throw new Error('permissão de localização negada');
            }
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });
            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
        } finally {
            setLoading(false);
        }
    };

    return { solicitarLocalizacao, loading };
}