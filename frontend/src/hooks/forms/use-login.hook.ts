import { useState } from "react";
import { SubmitEvent } from "react";
import { loginUser } from "@/services/auth.service";
import { loginSchema } from "@/schemas/auth.schema";

// Custom Hook for Login
export default function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [IsVerification, setIsVerification] = useState(false);

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const loginData = Object.fromEntries(formData.entries());
        
        const loginDataValidated = loginSchema.safeParse(loginData);

        if (!loginDataValidated.success) {
            const foundError = loginDataValidated.error.issues[0].message;
            setErrorMessage(foundError);
            return;
        }
        
        setIsLoading(true);
        setErrorMessage("");
        try {
            const response = await loginUser(loginDataValidated.data);

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