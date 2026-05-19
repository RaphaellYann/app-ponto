import { z } from 'zod';

export const cadastroSchema = z.object({
    nome: z.string().min(3, 'o nome deve ter no mínimo 3 caracteres').trim(),
    email: z.string().min(1, 'e-mail é obrigatório').email('formato de e-mail inválido').toLowerCase().trim(),
    senha: z.string().min(6, 'a senha deve ter no mínimo 6 caracteres'),
    confirmarSenha: z.string().min(1, 'confirmação de senha é obrigatória'),
}).refine((data) => data.senha === data.confirmarSenha, {
    message: 'as senhas não coincidem',
    path: ['confirmarSenha'],
});

export type CadastroData = z.infer<typeof cadastroSchema>;