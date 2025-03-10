import RegisterForm from "@/components/auth/RegisterForm";
import type { Metadata } from "next";
import Link from "next/link";


// This is the metadata for the page that will be rendered 
// SEO is important for the website to be found by search engines
export const metadata : Metadata = {
    title: 'CashTrack - Register',
    description: 'Register to create an account in finances',
    keywords: 'register, account, finances',
}

export default function RegisterPage() {
    return (
        <>
            <h1 className='text-6xl font-bold text-center'>Register</h1>
            <p className='text-3xl font-bold text-center'>Register to create an account <span className='text-yellow-500'> in finances</span></p>

            <RegisterForm />

            <nav className="mt-5 text-center space-y-4">
                <Link 
                    href="/auth/login"
                    className="text-gray-400"
                >
                    ¿Ya tienes una cuenta? <span className="font-bold text-gray-300">Inicia Sesion</span>
                </Link>
            </nav>

            <nav className="mt-5 text-center space-y-4">
                <Link 
                    href="/auth/forgot-password"
                    className="text-gray-400"
                >
                    ¿Olvidaste tu contraseña? <span className="font-bold text-gray-300">Recuperala</span>
                </Link>
            </nav>

        </>
    )
}
