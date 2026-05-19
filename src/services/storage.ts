import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../lib/validations/auth';

// gerenciamento de sessao
export const sessionService = {
    async save(user: User): Promise<void> {
        await AsyncStorage.setItem('@app_session', JSON.stringify(user));
    },
    async get(): Promise<User | null> {
        const session = await AsyncStorage.getItem('@app_session');
        return session ? JSON.parse(session) : null;
    },
    async clear(): Promise<void> {
        await AsyncStorage.removeItem('@app_session');
    }
};