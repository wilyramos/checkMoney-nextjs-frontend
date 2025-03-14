import { cookies } from "next/headers";

export default function getToken() {
    const token = cookies().get('cashtracker')?.value
    return token
}