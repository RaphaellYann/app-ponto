import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, 'e-mail é obrigatório').email('formato de e-mail inválido').toLowerCase().trim(),
    senha: z.string().min(6, 'a senha deve ter no mínimo 6 caracteres'),
});

export type LoginData = z.infer<typeof loginSchema>;
export type User = LoginData & { id: string; nome: string };