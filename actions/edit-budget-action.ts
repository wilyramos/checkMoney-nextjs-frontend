
"use server"

import getToken from "@/src/auth/token";
import { DraftBudgetSchema, ErrorResponseSchema, SuccessSchema, type Budget } from "@/src/schemas";
import { revalidatePath, revalidateTag } from "next/cache";

type ActionStateType = {
    errors : string[],
    success : string
}

export async function editBudget(budgetId: Budget['id'], prevState : ActionStateType, formData : FormData) {

    const budgetData = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }

    const budget = DraftBudgetSchema.safeParse(budgetData)

    if(!budget.success) {
        return {
            errors: budget.error.issues.map(issue => issue.message),
            success: ""
        }
    }

    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}`
    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(budget.data)
    })

    const json = await req.json()
    if(!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ""
        }
    }

    // revalidate the budgets page
    revalidateTag('all-budgets') 
    // revalidate the admin page
    // revalidatePath('/admin')

    const success = SuccessSchema.parse(json)
    return {
        errors: [],
        success
    }
}