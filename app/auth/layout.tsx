import Logo from "@/components/ui/Logo";
import ToastNotification from "@/components/ui/ToastNotification";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <>
            <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
                <div className="bg-yellow-500 flex items-center justify-center lg:min-h-screen bg-auth bg-30 bg-no-repeat bg-cover">

                    <div className="w-96 py-5 lg:py-20 ">
                        <Logo />
                    </div>
                </div>

                <div className="p-10 lg:py-28 lg:px-36">
                    <div className="max-w-3xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>

            <ToastNotification />
        </>
    );
}
