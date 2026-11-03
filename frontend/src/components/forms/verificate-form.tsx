"use client";
import useVerification from "@/hooks/forms/use-verification.hook";
import Loading from "../ui/loading";

// typing for opening and closing the verification modal
type VerificationModalProps = {
    isVerification: boolean,
    setIsVerification: (is: boolean) => void,
}

// Verification Form Component
export default function VerificationModal({ isVerification, setIsVerification } 
    : VerificationModalProps) {
    const {
        isLoading,
        errorMessage,
        handlePaste,
        handleKeyDown,
        handleInput,
        handleSubmit
    } = useVerification(setIsVerification); // Our custom hook for verifications
    
    if (!isVerification) return null; // If the verification modal is closed, we return null
    
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-full max-w-md flex flex-col gap-5 shadow-xl relative">
                <h1 className="m-auto text-3xl font-extrabold text-slate-900 tracking-tight">
                    Verificacion
                </h1>
                <p className="m-auto text-sm text-slate-500 mt-2">
                    Has recibido el codigo de verificacion en tu correo.
                </p>
                
                <form 
                    method="POST" 
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-5 relative" 
                    onPaste={handlePaste}
                >
                    {isLoading && (
                    <Loading />
                    )}
                    
                    <fieldset disabled={isLoading} className="flex flex-col gap-5 border-0 p-0 m-0 min-w-0">
                        <div className="flex justify-between gap-2">
                            <input type="text" name="code1" max={1} className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-300 bg-white text-slate-900 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all" required />
                            <input type="text" name="code2" max={1} className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-300 bg-white text-slate-900 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all" required />
                            <input type="text" name="code3" max={1} className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-300 bg-white text-slate-900 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all" required />
                            <input type="text" name="code4" max={1} className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-300 bg-white text-slate-900 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all" required />
                            <input type="text" name="code5" max={1} className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-300 bg-white text-slate-900 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all" required />
                            <input type="text" name="code6" max={1} className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-slate-300 bg-white text-slate-900 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition-all" required />
                        </div>
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
                        Verificar
                    </button>
                </form>
                
                <div className="flex justify-center">
                    <button 
                        type="button"
                        onClick={() => setIsVerification(false)}
                        className="text-sm text-slate-500 hover:text-slate-700 underline cursor-pointer transition-colors"
                    >
                        Cerrar
                    </button>
                </div>
                
            </div>
        </div>
    );
}