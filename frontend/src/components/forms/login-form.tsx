"use client";
import Input from "../ui/input";
import Loading from "../ui/loading";
import VerificationModal from "./verificate-form";
import useLogin from "@/hooks/forms/use-login.hook";

// Login form component
export default function RegisterForm() {
    const {isLoading, errorMessage, IsVerification, setIsVerification, handleSubmit} = useLogin(); // Our custom hook for Login

    return (
        <>
        <form 
            method="POST" 
            className="w-full flex flex-col gap-5 relative" 
            onSubmit={handleSubmit}
        >
            {isLoading && (
            <Loading />
            )}

            <fieldset disabled={isLoading} className="flex flex-col gap-5 border-0 p-0 m-0 min-w-0">
            <Input name="username" type="text" placeholder="Introduce tu nombre de usuario" isRequired={true} />
            <Input name="password" type="password" placeholder="Introduce tu contraseña" isRequired={true} />
            </fieldset>

            <div className="min-h-5.5 flex items-center">
            {errorMessage && (
                <p className="text-red-500 text-sm font-medium">
                {errorMessage}
                </p>
            )}
            </div>

            <button 
            type="submit"
            disabled={isLoading}
            className="cursor-pointer mt-3 w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-200 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
            Iniciar Sesion
            </button>
        </form>
        <VerificationModal isVerification={IsVerification} setIsVerification={setIsVerification}/>
        </>
    );
}