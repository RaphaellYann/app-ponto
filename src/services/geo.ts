import axios from 'axios';

export const geocodingService = {
    async obterEndereco(latitude: number, longitude: number): Promise<string> {
        try {
            const { data } = await axios.get(
                'https://nominatim.openstreetmap.org/reverse',
                {
                    params: { lat: latitude, lon: longitude, format: 'json', 'accept-language': 'pt-BR' },
                    headers: { 'User-Agent': 'app-ponto/1.0' },
                    timeout: 5000,
                }
            );

            const a = data.address;
            if (!a) throw new Error('Endereço não encontrado');

            const rua    = a.road ?? a.pedestrian ?? a.footway ?? a.highway ?? '';
            const numero = a.house_number ? `, ${a.house_number}` : '';
            const bairro = a.suburb ?? a.neighbourhood ?? a.quarter ?? '';
            const cidade = a.city ?? a.town ?? a.village ?? a.municipality ?? '';
            const estado = a.state ?? '';
            const cep    = a.postcode ? ` - CEP ${a.postcode}` : '';

            const partes = [rua + numero, bairro, cidade, estado].filter(Boolean);
            return partes.length > 0
                ? partes.join(' - ') + cep
                : 'Endereço não encontrado';
        } catch {
            return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        }
    },
};