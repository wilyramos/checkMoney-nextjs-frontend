"use server"

import getToken from "@/src/auth/token"
import { DraftExpenseSchema, ErrorResponseSchema, SuccessSchema, type Budget, type Expense } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type ActionStateType = {
    errors : string[],
    success : string
}

type BudgetAndExpenseId = {
    budgetId : Budget['id'],
    expenseId: Expense['id']
}

export default async function editExpense(
    {budgetId, expenseId} :BudgetAndExpenseId,
    prevState : ActionStateType, 
    formData : FormData
) {

    const expense = DraftExpenseSchema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    })

    if(!expense.success) {
        return {
            errors: expense.error.issues.map(issue => issue.message),
            success: ""
        }
    }

    // update expense

    const token = getToken()

    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`
    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(expense.data)
    })

    const json = await req.json()
    if(!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ""
        }
    }

    const success = SuccessSchema.parse(json)

    //revalidatePath
    revalidatePath(`/admin/budgets/${budgetId}`)
    
    // Editar gasto
    return {
        errors: [],
        success
    }


}