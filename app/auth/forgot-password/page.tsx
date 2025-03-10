import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";
import Link from "next/link";


// This is the metadata for the page that will be rendered 
// SEO is important for the website to be found by search engines
export const metadata : Metadata = {
    title: 'CashTrack - Olvidé mi contraseña',
    description: 'Login to access your account in finances',
    keywords: 'forgot, account, finances',
}

export default function ForgotPasswordPage() {
    return (
        <>
            <h1 className='text-6xl font-bold text-center'>Olvidé mi contraseña</h1>
            <p className='text-3xl font-bold text-center'>Recupera tu contraseña <span className='text-yellow-500'> en finances</span></p>
            
            <ForgotPasswordForm />

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
                    href="/auth/register"
                    className="text-gray-400"
                >
                    ¿No tienes una cuenta? <span className="font-bold text-gray-300">Registrate</span>
                </Link>
            </nav>
        </>
    )
}
