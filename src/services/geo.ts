export const geocodingService = {
    async obterEndereco(latitude: number, longitude: number): Promise<string> {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=pt-BR`,
                { headers: { 'User-Agent': 'app-ponto/1.0' } }
            );
            const data = await response.json();
            const a = data.address;
            const rua = a.road ?? a.pedestrian ?? a.footway ?? '';
            const numero = a.house_number ? `, ${a.house_number}` : '';
            const bairro = a.suburb ?? a.neighbourhood ?? a.quarter ?? '';
            const cidade = a.city ?? a.town ?? a.village ?? '';
            const estado = a.state ?? '';
            const partes = [rua + numero, bairro, cidade, estado].filter(Boolean);
            return partes.join(' - ') || 'Endereço não encontrado';
        } catch {
            return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        }
    },
};