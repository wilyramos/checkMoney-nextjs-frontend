import { verifySession } from "@/src/auth/dal"
import getToken from "@/src/auth/token"
import { verify } from "crypto"
import { console } from "inspector"


export async function GET(request: Request, {params} : { params: { budgetId: string, expenseId: string}}) {

    await verifySession()

    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${params.budgetId}/expenses/${params.expenseId}`

    const req = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    const json = await req.json()
    if(!req.ok) {
        return Response.json(json.error, {status: req.status})
    }

    return Response.json(json)

}