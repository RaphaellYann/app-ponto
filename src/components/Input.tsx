import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

interface InputProps extends TextInputProps {
    nome: string;
    label: string;
}

export function Input({ nome, label, secureTextEntry, ...rest }: InputProps) {
    const { control, formState: { errors } } = useFormContext();
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const error = errors[nome]?.message as string | undefined;
    const isSenha = secureTextEntry === true;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Controller
                control={control}
                name={nome}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={[styles.inputWrapper, !!error && styles.inputError]}>
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry={isSenha && !senhaVisivel}
                            autoCapitalize="none"
                            placeholderTextColor="#9CA3AF"
                            {...rest}
                        />
                        {isSenha && (
                            <TouchableOpacity
                                onPress={() => setSenhaVisivel(prev => !prev)}
                                style={styles.olhinho}
                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            >
                                <MaterialIcons
                                    name={senhaVisivel ? 'visibility' : 'visibility-off'}
                                    size={20}
                                    color="#6B7280"
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 14,
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        color: '#111827',
    },
    inputError: {
        borderColor: '#EF4444',
    },
    olhinho: {
        padding: 4,
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4,
    },
});