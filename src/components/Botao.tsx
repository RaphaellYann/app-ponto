import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface BotaoProps extends TouchableOpacityProps {
    label: string;
    loading?: boolean;
    variante?: 'primario' | 'secundario';
}

export function Botao({ label, loading, variante = 'primario', ...rest }: BotaoProps) {
    const isPrimario = variante === 'primario';
    return (
        <TouchableOpacity
            style={[styles.botao, isPrimario ? styles.primario : styles.secundario, rest.disabled && styles.desabilitado]}
            disabled={loading || rest.disabled}
            activeOpacity={0.8}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color={isPrimario ? '#FFF' : '#2563EB'} />
            ) : (
                <Text style={[styles.label, isPrimario ? styles.labelPrimario : styles.labelSecundario]}>
                    {label}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botao: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 8,
    },
    primario: {
        backgroundColor: '#2563EB',
    },
    secundario: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#2563EB',
    },
    desabilitado: {
        opacity: 0.6,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    labelPrimario: {
        color: '#FFFFFF',
    },
    labelSecundario: {
        color: '#2563EB',
    },
});