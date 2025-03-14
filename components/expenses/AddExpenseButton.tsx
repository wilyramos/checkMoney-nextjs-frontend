
"use client"

import { useRouter } from "next/navigation"

export default function AddExpenseButton() {

    const router = useRouter()


    return (
        <button 
            type="button"
            className="bg-amber-500 p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors rounded-lg"
            onClick={() => router.push(location.pathname + '?addExpense=true&showModal=true')}    
        >Agregar gasto</button>
    )
}