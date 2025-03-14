"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, SuccessSchema, type Budget, type Expense } from "@/src/schemas"
import { revalidatePath } from "next/cache"


type BudgetAndExpenseIdType = {
    budgetId: Budget['id']
    expenseId: Expense['id']
}

type ActionStateType = {
    errors: string[]
    success: string
}

export default async function deleteExpense(
    {budgetId, expenseId} : BudgetAndExpenseIdType, 
    prevState: ActionStateType) {

    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const req = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,

        }
    })
    const json = await req.json()

    console.log(json)
    if(!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ""
        }
    }

    const success = SuccessSchema.parse(json)
    revalidatePath(`/admin/budgets/${budgetId}`)

    return {
        errors: [],
        success
    }
}