import { formatCurrency } from "@/src/utils"


type AmoutProps = {
    label: string
    amount: number
}

export default function Amount({ label, amount }: AmoutProps) {
    return (

        <>

            <p className="text-xl font-bold">{label}</p>
            <p>
                <span className="font-bold text-2xl text-amber-600">
                    {formatCurrency(amount)}
                </span>
            </p>
        </>
    )
}
