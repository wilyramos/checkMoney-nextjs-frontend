"use client"

import type { Budget } from "@/src/schemas";
import BudgetForm from "./BudgetForm";
import { useFormState } from "react-dom";
import { editBudget } from "@/actions/edit-budget-action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function EditBudgetForm( { budget } : { budget: Budget} ) {


    const router = useRouter()

    // send the id of the budget to the editBudget function
    const editBudgetWithId = editBudget.bind(null, budget.id)
    const [ state, dispatch ] = useFormState(editBudgetWithId, {
        errors: [],
        success: ""
    })


    useEffect(() => {
        if(state.errors) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
        if(state.success) {
            toast.success(state.success)
            router.push('/admin')
        }
    }, [ state, router ])


    return (
        <form
            className="mt-10 space-y-3"
            noValidate
            action={dispatch}
        >
            {/* {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)} */}
            <BudgetForm 
                budget = {budget}
            />
            <input
                type="submit"
                className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                value='Guardar cambios'
            />
        </form>
    )
}
