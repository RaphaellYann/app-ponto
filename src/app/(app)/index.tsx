import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useLocation } from '../../hooks/useLocation';
import { usePonto } from '../../hooks/usePonto';
import { User } from '../../lib/validations/auth';

export default function BaterPonto() {
    const router = useRouter();
    const { getSessao, logout } = useAuth();
    const { solicitarLocalizacao, loading: loadingLocation } = useLocation();
    const { registrar } = usePonto();
    const [user, setUser] = useState<User | null>(null);
    const [registrando, setRegistrando] = useState(false);

    useEffect(() => {
        getSessao().then(setUser);
    }, []);

    const handleBaterPonto = async () => {
        if (!user) return;
        setRegistrando(true);
        try {
            const { latitude, longitude } = await solicitarLocalizacao();
            await registrar(user.id, latitude, longitude);
            Alert.alert('Ponto registrado!', `Às ${new Date().toLocaleTimeString('pt-BR')}`);
        } catch (error: any) {
            Alert.alert('Erro', error.message);
        } finally {
            setRegistrando(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        router.replace('/(auth)');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.saudacao}>Olá,</Text>
                    <Text style={styles.nome}>{user?.nome ?? '...'}</Text>
                </View>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                    <MaterialIcons name="logout" size={24} color="#6B7280" />
                </TouchableOpacity>
            </View>

            <View style={styles.relogio}>
                <Text style={styles.hora}>{new Date().toLocaleTimeString('pt-BR')}</Text>
                <Text style={styles.data}>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}</Text>
            </View>

            <TouchableOpacity
                style={[styles.botaoPonto, (registrando || loadingLocation) && styles.botaoDesabilitado]}
                onPress={handleBaterPonto}
                disabled={registrando || loadingLocation}
                activeOpacity={0.8}
            >
                <MaterialIcons name="fingerprint" size={64} color="#FFFFFF" />
                <Text style={styles.botaoTexto}>
                    {registrando || loadingLocation ? 'Registrando...' : 'Bater Ponto'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },
    saudacao: {
        fontSize: 16,
        color: '#6B7280',
    },
    nome: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
    },
    logoutBtn: {
        padding: 8,
    },
    relogio: {
        alignItems: 'center',
        marginBottom: 60,
    },
    hora: {
        fontSize: 56,
        fontWeight: 'bold',
        color: '#111827',
        letterSpacing: -1,
    },
    data: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 4,
        textTransform: 'capitalize',
    },
    botaoPonto: {
        backgroundColor: '#2563EB',
        borderRadius: 100,
        width: 200,
        height: 200,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
    },
    botaoDesabilitado: {
        opacity: 0.6,
    },
    botaoTexto: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});