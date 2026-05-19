import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../lib/validations/auth';
import { Ponto } from '../lib/validations/ponto';

const KEYS = {
    users: '@db_users',
    pontos: '@db_pontos',
    session: '@app_session',
} as const;

export const dbService = {
    users: {
        async getAll(): Promise<User[]> {
            const data = await AsyncStorage.getItem(KEYS.users);
            return data ? JSON.parse(data) : [];
        },
        async findByEmail(email: string): Promise<User | null> {
            const users = await this.getAll();
            return users.find(u => u.email === email) ?? null;
        },
        async insert(user: User): Promise<void> {
            const users = await this.getAll();
            if (users.some(u => u.email === user.email)) {
                throw new Error('já existe uma conta com este e-mail');
            }
            users.push(user);
            await AsyncStorage.setItem(KEYS.users, JSON.stringify(users));
        },
    },

    pontos: {
        async getAll(): Promise<Ponto[]> {
            const data = await AsyncStorage.getItem(KEYS.pontos);
            return data ? JSON.parse(data) : [];
        },
        async getByUserId(userId: string): Promise<Ponto[]> {
            const pontos = await this.getAll();
            return pontos
                .filter(p => p.userId === userId)
                .sort((a, b) => b.timestamp - a.timestamp);
        },
        async insert(ponto: Ponto): Promise<void> {
            const pontos = await this.getAll();
            pontos.push(ponto);
            await AsyncStorage.setItem(KEYS.pontos, JSON.stringify(pontos));
        },
    },

    session: {
        async save(user: User): Promise<void> {
            await AsyncStorage.setItem(KEYS.session, JSON.stringify(user));
        },
        async get(): Promise<User | null> {
            const data = await AsyncStorage.getItem(KEYS.session);
            return data ? JSON.parse(data) : null;
        },
        async clear(): Promise<void> {
            await AsyncStorage.removeItem(KEYS.session);
        },
    },
};