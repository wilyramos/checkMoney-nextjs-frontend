"use client"


import { ToastContainer } from 'react-toastify';

export default function ToastNotification() {
	return (
		<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
		/>
	)
}