import type React from "react";



export default function ErrorMessage({children }: { children : React.ReactNode }) {
  return (
    <p className="text-center my-2 bg-red-600 text-white p-2 rounded-md">
      {children}
    </p>
  )
}
