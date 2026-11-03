import Link from "next/link";
import RegisterForm from "@/components/forms/register-form";

// Account Creation Page
export default function Home() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-lg bg-white border border-slate-300 rounded-3xl p-10 shadow-xl shadow-slate-200/60">
            
            <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3 tracking-wide uppercase">
                Track Your Products
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Crea una cuenta
            </h1>
            <p className="text-sm text-slate-500 mt-2">
                Introduce tus datos para empezar a monitorizar tus productos
            </p>
            </div>

            <RegisterForm />
            <Link href={"/login"}><button className="cursor-pointer mt-3 mx-auto block w-50 py-2.5 px-4 bg-gray-100 hover:bg-gray-300 active:bg-gray-600font-semibold rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-200 text-base">Ya tengo una cuenta</button></Link>
        </div>
        </div>
    );
}