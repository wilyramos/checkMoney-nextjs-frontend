"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ErrorResponseSchema, LoginSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[],
    success: string
}

export async function authenticate(prevState: any, formData: FormData){


    const loginCredentials = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    const auth = LoginSchema.safeParse(loginCredentials)
    if (!auth.success) {
        return {
            errors: auth.error?.issues.map((issue) => issue.message),
            success: ''
        }
    }

    const url = `${process.env.API_URL}/auth/login`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: auth.data.email,
            password: auth.data.password
        })
    })

    const json = await req.json()

    if (!req.ok) {
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ""
        }
    }

    // Setear la cookie

    cookies().set({
        name: 'cashtracker',
        value: json,
        httpOnly: true, // No se puede acceder desde el cliente
        path: '/',
    })

    redirect('/admin')
}