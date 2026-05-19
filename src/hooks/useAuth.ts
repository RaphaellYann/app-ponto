import { LoginData, User } from '../lib/validations/auth';
import { CadastroData } from '../lib/validations/cadastro';
import { authApi } from '../services/api';
import { dbService } from '../services/db';

export function useAuth() {
    const login = (data: LoginData): Promise<User> => authApi.login(data);
    const cadastro = (data: CadastroData): Promise<User> => authApi.cadastro(data);
    const logout = (): Promise<void> => authApi.logout();
    const getSessao = (): Promise<User | null> => dbService.session.get();

    return { login, cadastro, logout, getSessao };
}