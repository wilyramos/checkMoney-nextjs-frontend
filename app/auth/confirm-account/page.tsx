import ConfirmAccountForm from '@/components/auth/ConfirmAccountForm'
import React from 'react'

export default function ConfirmAccountPage() {
  return (
    <>
        <h1 className='text-center text-3xl text-gray-900 font-bold'>Confirm your email</h1>
        <p className='text-3xl font-bold'> Ingresa el codigo que recibiste
            <span className='text-amber-500'> en tu email</span>

        </p>
        <ConfirmAccountForm />
    </>
  )
}
