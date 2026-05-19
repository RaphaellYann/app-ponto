import { Ponto } from '../lib/validations/ponto';
import { pontoApi } from '../services/api';

export function usePonto() {
    const registrar = (userId: string, latitude: number, longitude: number): Promise<Ponto> =>
        pontoApi.registrar(userId, latitude, longitude);

    const listar = (userId: string): Promise<Ponto[]> =>
        pontoApi.listar(userId);

    return { registrar, listar };
}