import { z } from 'zod';


export const RegisterSchema = z.object({
    email: z.string()
        .email({ message: 'Email inválido' }),
    name: z.string()
        .min(1, { message: 'El nombre no puede estar vacío' }),
    password: z.string()
        .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
    password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation']
});

export const SuccessSchema = z.string().min(1, { message: 'Valor inválido' });

// Schema 
export const ErrorResponseSchema = z.object({
    error: z.string()
})

export const TokenSchema = z.string({message: "Token inválido"})
                            .length(6, {message: "Token inválido"})