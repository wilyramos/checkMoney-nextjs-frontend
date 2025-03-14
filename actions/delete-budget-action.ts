"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, PasswordValidationSchema, SuccessSchema, type Budget } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors: string[]
    success: string
}


export async function deleteBudget(budgetId: Budget['id']  ,prevState: ActionStateType, formData: FormData) {

    const curretPassword = PasswordValidationSchema.safeParse(formData.get('password'))
    if(!curretPassword.success) {
        return {
            errors: curretPassword.error.issues.map((issue) => issue.message),
            success: ""
        }
    }

    // Comprobar que el password es correcto
    const token = getToken()
    const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`
    const checkPasswordReq = await fetch(checkPasswordUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: curretPassword.data
        })
    })

    const checkPasswordJson = await checkPasswordReq.json()
    if(!checkPasswordReq.ok) {
        const { error } = ErrorResponseSchema.parse(checkPasswordJson)
        return {
            errors: [error],
            success: ""
        }
    }

    // Eliminar el presupuesto
    const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`
    const deleteBudgetReq = await fetch(deleteBudgetUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const deleteBudgetJson = await deleteBudgetReq.json()
    if(!deleteBudgetReq.ok) {
        const { error } = ErrorResponseSchema.parse(deleteBudgetJson)
        return {
            errors: [error],
            success: ""
        }
    }

    revalidatePath('/admin')

    const success = SuccessSchema.parse(deleteBudgetJson)

    return {
        errors: [],
        success
    }
}