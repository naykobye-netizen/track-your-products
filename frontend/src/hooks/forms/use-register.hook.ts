import { useState } from "react";
import { SubmitEvent } from "react";
import { registerUser } from "@/services/auth.service";
import { registerSchema } from "@/schemas/auth.schema";

// Custom Hook for Register
export default function useRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [IsVerification, setIsVerification] = useState(false);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const registerData = Object.fromEntries(formData.entries());
        
        const registerDataValidated = registerSchema.safeParse(registerData);
        if (!registerDataValidated.success) {
            const foundError = registerDataValidated.error.issues[0].message;
            setErrorMessage(foundError);
            return;
        }
        
        setIsLoading(true);
        setErrorMessage("");
        try {
            const response = await registerUser(registerDataValidated.data);

            if (!response.success) {
                setErrorMessage(response.error);
            } else {
                setIsVerification(true);
                setErrorMessage("");
            }
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        errorMessage,
        IsVerification,
        setIsVerification,
        handleSubmit
    };
    
}