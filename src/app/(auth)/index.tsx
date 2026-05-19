import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Botao } from '../../components/Botao';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import { LoginData, loginSchema } from '../../lib/validations/auth';

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();

    const form = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginData) => {
        try {
            await login(data);
            router.replace('/(app)');
        } catch (error: any) {
            Alert.alert('Erro de autenticação', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Bem-vindo</Text>
                <Text style={styles.subtitulo}>Faça login para registrar seu ponto</Text>
            </View>
            <FormProvider {...form}>
                <Input nome="email" label="E-mail" keyboardType="email-address" />
                <Input nome="senha" label="Senha" secureTextEntry />
                <View style={styles.acoes}>
                    <Botao
                        label="Entrar"
                        onPress={form.handleSubmit(onSubmit)}
                        loading={form.formState.isSubmitting}
                    />
                    <Botao
                        label="Criar nova conta"
                        variante="secundario"
                        onPress={() => router.push('/(auth)/cadastro')}
                        disabled={form.formState.isSubmitting}
                    />
                </View>
            </FormProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
    },
    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#111827',
    },
    subtitulo: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 8,
    },
    acoes: {
        marginTop: 24,
        gap: 16,
    },
});