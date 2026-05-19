import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Botao } from '../../components/Botao';
import { Input } from '../../components/Input';
import { CadastroData, cadastroSchema } from '../../lib/validations/cadastro';
import { authApi } from '../../services/api';

export default function Cadastro() {
    const router = useRouter();

    const form = useForm<CadastroData>({
        resolver: zodResolver(cadastroSchema),
    });

    const onSubmit = async (data: CadastroData) => {
        try {
            await authApi.cadastro(data);
            Alert.alert('Conta criada!', 'Faça login para continuar.', [
                { text: 'OK', onPress: () => router.replace('/(auth)') }
            ]);
        } catch (error: any) {
            Alert.alert('Erro no cadastro', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Criar Conta</Text>
            <FormProvider {...form}>
                <Input nome="nome" label="Nome Completo" />
                <Input nome="email" label="E-mail" keyboardType="email-address" />
                <Input nome="senha" label="Senha" secureTextEntry />
                <Input nome="confirmarSenha" label="Confirmar Senha" secureTextEntry />
                <View style={styles.acoes}>
                    <Botao
                        label="Cadastrar"
                        onPress={form.handleSubmit(onSubmit)}
                        loading={form.formState.isSubmitting}
                    />
                    <Botao
                        label="Voltar para Login"
                        variante="secundario"
                        onPress={() => router.back()}
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
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 32,
    },
    acoes: {
        marginTop: 24,
        gap: 16,
    },
});