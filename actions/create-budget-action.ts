"use server"

import { DraftBudgetSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"


type ActionStateType = {
    errors: string[]
    success: string
}


export async function createBudget( prevState : ActionStateType, formData: FormData ) {

    const budget = DraftBudgetSchema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    })
    if (!budget.success) {
        return {
            errors: budget.error.issues.map(issue => issue.message),
            success: ''
        }
    }

    const token = cookies().get('cashtracker')?.value
    const url = `${process.env.API_URL}/budgets`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: budget.data.name,
            amount: budget.data.amount
        })
    })

    const json = await req.json()
    const success = SuccessSchema.parse(json)

    revalidatePath('/admin')
    
    return {
        errors: [],
        success
    }
}