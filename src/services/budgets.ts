import { cache } from "react"
import getToken from "../auth/token"
import { notFound } from "next/navigation"
import { BudgetAPIResponseSchema } from "../schemas"


// Cacheamos la función para que no se haga una petición a la API cada vez que se renderiza la página


export const getBudget = cache (async (id: string) => {

    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${id}`
    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const json = await req.json()
    if (!req.ok) {
        notFound()
    }

    const budget = BudgetAPIResponseSchema.parse(json)
    return budget
})