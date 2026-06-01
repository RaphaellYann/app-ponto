import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { usePonto } from '../../hooks/usePonto';
import { Ponto } from '../../lib/validations/ponto';

export default function Registros() {
    const { getSessao } = useAuth();
    const { listar } = usePonto();
    const [pontos, setPontos] = useState<Ponto[]>([]);
    const [dataFiltro, setDataFiltro] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const carregar = async () => {
                const user = await getSessao();
                if (!user) return;
                const lista = await listar(user.id);
                setPontos(lista);
            };
            carregar();
        }, [])
    );

    const pontosFiltrados = pontos.filter(p => {
        const dataPonto = new Date(p.timestamp).toLocaleDateString('pt-BR');
        const dataSelecionada = dataFiltro.toLocaleDateString('pt-BR');
        return dataPonto === dataSelecionada;
    });

    const onDateChange = (_: any, selectedDate?: Date) => {
        setShowPicker(Platform.OS === 'ios');
        if (selectedDate) setDataFiltro(selectedDate);
    };

    return (
        <View style={styles.container}>
            <View style={styles.filtroContainer}>
                <Text style={styles.filtroLabel}>Filtrar por data:</Text>
                <TouchableOpacity style={styles.botaoData} onPress={() => setShowPicker(true)}>
                    <Text style={styles.textoBotaoData}>{dataFiltro.toLocaleDateString('pt-BR')}</Text>
                </TouchableOpacity>
                {showPicker && (
                    <DateTimePicker
                        value={dataFiltro}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                    />
                )}
            </View>

            <FlatList
                data={pontosFiltrados}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.lista}
                ListEmptyComponent={
                    <Text style={styles.vazio}>Nenhum ponto registrado nesta data.</Text>
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.cardHora}>
                            {new Date(item.timestamp).toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
                        </Text>
                        {item.endereco ? (
                            <Text style={styles.cardEndereco}>{item.endereco}</Text>
                        ) : null}
                        <Text style={styles.cardCoords}>
                            {item.latitude.toFixed(5)}, {item.longitude.toFixed(5)}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    filtroContainer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    filtroLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    botaoData: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    textoBotaoData: {
        fontSize: 16,
        color: '#2563EB',
        fontWeight: '500',
    },
    lista: {
        padding: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    cardHora: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    cardEndereco: {
        fontSize: 13,
        color: '#374151',
        marginTop: 6,
        lineHeight: 18,
    },
    cardCoords: {
        fontSize: 11,
        color: '#9CA3AF',
        marginTop: 4,
    },
    vazio: {
        textAlign: 'center',
        color: '#6B7280',
        marginTop: 40,
        fontSize: 16,
    },
});