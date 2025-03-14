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

export const LoginSchema = z.object({
    email: z.string()
        .email({ message: 'Email inválido' }),
    password: z.string()
        .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});


export const TokenSchema = z.string({ message: "Token inválido" })
    .length(6, { message: "Token inválido" })


export const ForgotPasswordSchema = z.object({
    email: z.string()
        .min(1, { message: 'El Email es Obligatorio' })
        .email({ message: 'Email no válido' }),
})

export const DraftBudgetSchema = z.object({
    name: z.string()
        .min(1, { message: 'El Nombre del presupuesto es obligatorio' }),
    amount: z.coerce.
        number({ message: 'Cantidad no válida' })
        .min(1, { message: 'Cantidad no válida' }),
})

export const ResetPasswordSchema = z.object({
    password: z.string()
        .min(8, { message: 'El Password debe ser de al menos 8 caracteres' }),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"]
});

export const PasswordValidationSchema = z.string().min(1, { message: 'Password inválido' });

export const DraftExpenseSchema = z.object({
    name: z.string().min(1, { message: 'Nombre inválido' }),
    amount: z.coerce.number().min(1, { message: 'Cantidad inválida' }),
});

export const SuccessSchema = z.string().min(1, { message: 'Valor inválido' });

// Schema 
export const ErrorResponseSchema = z.object({
    error: z.string()
})

export const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email()
})

export const ExpenseAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    budgetId: z.number(),
})

export const BudgetAPIResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    amount: z.string(),
    userId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    expenses: z.array(ExpenseAPIResponseSchema)
})

export const BudgetsAPIResponseSchema = z.array(BudgetAPIResponseSchema.omit({ expenses: true }))
export type User = z.infer<typeof UserSchema>
export type Budget = z.infer<typeof BudgetAPIResponseSchema>
export type Expense = z.infer<typeof ExpenseAPIResponseSchema>
export type DrafExpense = z.infer<typeof DraftExpenseSchema>