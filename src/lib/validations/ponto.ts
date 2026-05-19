import { z } from 'zod';

export const pontoSchema = z.object({
    id: z.string(),
    userId: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    timestamp: z.number(),
    endereco: z.string().optional(),
});

export type Ponto = z.infer<typeof pontoSchema>;