import * as Crypto from 'expo-crypto';
import { LoginData, User } from '../lib/validations/auth';
import { CadastroData } from '../lib/validations/cadastro';
import { Ponto } from '../lib/validations/ponto';
import { dbService } from './db';
import { geocodingService } from './geo';

export const authApi = {
    async login(data: LoginData): Promise<User> {
        const user = await dbService.users.findByEmail(data.email);
        if (!user || user.senha !== data.senha) {
            throw new Error('e-mail ou senha inválidos');
        }
        await dbService.session.save(user);
        return user;
    },

    async cadastro(data: CadastroData): Promise<User> {
        const { confirmarSenha, ...userData } = data;
        const newUser: User = { ...userData, id: Crypto.randomUUID() };
        await dbService.users.insert(newUser);
        return newUser;
    },

    async logout(): Promise<void> {
        await dbService.session.clear();
    },
};

export const pontoApi = {
    async registrar(userId: string, latitude: number, longitude: number): Promise<Ponto> {
        const endereco = await geocodingService.obterEndereco(latitude, longitude);
        const ponto: Ponto = {
            id: Crypto.randomUUID(),
            userId,
            latitude,
            longitude,
            timestamp: Date.now(),
            endereco,
        };
        await dbService.pontos.insert(ponto);
        return ponto;
    },

    async listar(userId: string): Promise<Ponto[]> {
        return dbService.pontos.getByUserId(userId);
    },
};