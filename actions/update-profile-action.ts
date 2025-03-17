"use server"

import getToken from "@/src/auth/token"
import { ErrorResponseSchema, SuccessSchema, UpdateProfileSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"


type ActionStateType = {
    errors: string[],
    success: string
}

export async function updateProfile(prevState: ActionStateType, formData: FormData){

    const userProfile = UpdateProfileSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
    })

    if(!userProfile.success){
        return {
            errors: userProfile.error.issues.map(issue => issue.message),
            success: ""
        }
    }

    const token = getToken()
    const url = `${process.env.API_URL}/auth/update-profile`

    const req = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            name: userProfile.data.name,
            email: userProfile.data.email
        })
    })

    const json = await req.json()
    if(!req.ok){
        const { error } = ErrorResponseSchema.parse(json)
        return {
            errors: [error],
            success: ""
        }
    }

    // Revalidate path

    revalidatePath("/admin/profile/settings")

    const success = SuccessSchema.parse(json)
    return {
        errors: [],
        success
    }
}
