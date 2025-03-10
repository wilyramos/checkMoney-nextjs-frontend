import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";
import Link from "next/link";


// This is the metadata for the page that will be rendered 
// SEO is important for the website to be found by search engines
export const metadata : Metadata = {
    title: 'CashTrack - Login',
    description: 'Login to access your account in finances',
    keywords: 'login, account, finances',
}

export default function LoginPage() {
    return (
        <>
            <h1 className='text-6xl font-bold text-center'>Login</h1>
            <p className='text-3xl font-bold text-center'>Login to access your account <span className='text-yellow-500'> in finances</span></p>

            <LoginForm />

            <nav className="mt-5 text-center space-y-4">
                <Link
                    href="/auth/register"
                    className="text-gray-400"
                >
                    ¿No tienes una cuenta? <span className="font-bold text-gray-300">Registrate</span>
                </Link>
            </nav>
        </>
    )
}
