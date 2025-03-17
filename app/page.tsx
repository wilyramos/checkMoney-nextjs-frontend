import Logo from "@/components/ui/Logo";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-900 py-5 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Logo />
          <nav className="flex items-center space-x-8">
            <Link
              href="/auth/login"
              className="font-medium text-white hover:text-yellow-400 transition-all uppercase text-sm tracking-wide"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/register"
              className="bg-yellow-400 text-purple-900 font-semibold py-2 px-5 rounded-full hover:bg-yellow-500 transition-all text-sm"
            >
              Registrarme
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-8 space-y-8 mt-16">
        <section className="text-center">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-purple-900 leading-tight">
            Administra tus Finanzas con{" "}
            <span className="text-yellow-400">CashTrackr</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            Simplifica el control de tus gastos e ingresos con nuestra plataforma intuitiva y accesible desde cualquier lugar. ¡Domina tus finanzas personales o empresariales ahora!
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-4xl font-bold text-purple-900 text-center">
            ¿Por qué elegir <span className="text-yellow-400">CashTrackr</span>?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Organización sin Esfuerzo",
                description:
                  "Clasifica y visualiza tus gastos de manera clara y sencilla con nuestro panel intuitivo.",
              },
              {
                title: "Presupuestación Inteligente",
                description:
                  "Establece metas financieras y sigue tu progreso fácilmente con nuestras herramientas avanzadas.",
              },
              {
                title: "Acceso en cualquier lugar",
                description:
                  "Administra tus finanzas desde cualquier dispositivo y en cualquier lugar del mundo.",
              },
              {
                title: "Seguridad Garantizada",
                description:
                  "Protegemos tus datos con los más altos estándares de seguridad para que estés tranquilo.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white shadow-lg rounded-xl transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-purple-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-purple-900 py-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <nav className="flex flex-col md:flex-row md:justify-between gap-5 text-sm">
            <Link href="/auth/register" className="hover:underline">
              ¿No tienes cuenta? Crea una
            </Link>
            <Link href="/auth/login" className="hover:underline">
              ¿Ya tienes cuenta? Inicia Sesión
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
