import Image from "next/image"



export default function Logo() {
    return (

        <Image 
            src="/logo.svg" 
            alt="Logo CashTracker" 
            width={400}
            height={100}
        />
    )
}