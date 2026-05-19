import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { useAuth } from '../../hooks/useAuth';
import { usePonto } from '../../hooks/usePonto';
import { Ponto } from '../../lib/validations/ponto';

const REGIAO_BRASIL: Region = {
    latitude: -14.235,
    longitude: -51.9253,
    latitudeDelta: 20,
    longitudeDelta: 20,
};

export default function Mapa() {
    const { getSessao } = useAuth();
    const { listar } = usePonto();
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [region, setRegion] = useState<Region>(REGIAO_BRASIL);
    const mapRef = useRef<MapView>(null);

    useFocusEffect(
        useCallback(() => {
            const carregar = async () => {
                const user = await getSessao();
                if (!user) return;
                const lista = await listar(user.id);
                setPontos(lista);

                if (lista.length > 0) {
                    const novaRegion: Region = {
                        latitude: lista[0].latitude,
                        longitude: lista[0].longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    };
                    setRegion(novaRegion);
                    mapRef.current?.animateToRegion(novaRegion, 800);
                }
            };
            carregar();
        }, [])
    );

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.mapa}
                region={region}
                onRegionChangeComplete={setRegion}
                showsUserLocation
            >
                {pontos.map((ponto) => (
                    <Marker
                        key={ponto.id}
                        coordinate={{ latitude: ponto.latitude, longitude: ponto.longitude }}
                        title={new Date(ponto.timestamp).toLocaleTimeString('pt-BR')}
                        description={ponto.endereco ?? `${ponto.latitude.toFixed(5)}, ${ponto.longitude.toFixed(5)}`}
                        pinColor="#2563EB"
                    />
                ))}
            </MapView>
            {pontos.length === 0 && (
                <View style={styles.semPontos}>
                    <Text style={styles.semPontosTexto}>Nenhum ponto registrado ainda.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapa: {
        width: '100%',
        height: '100%',
    },
    semPontos: {
        position: 'absolute',
        bottom: 32,
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    semPontosTexto: {
        fontSize: 14,
        color: '#6B7280',
    },
});