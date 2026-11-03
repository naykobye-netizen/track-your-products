import { useState, SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { verifyUser } from "@/services/auth.service";
import Cookies from "js-cookie";

// Custom Hook for Verification
export default function useVerification( setIsVerification: (is: boolean) => void) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    function handlePaste(e: React.ClipboardEvent<HTMLFormElement>) {
        const target = e.target;
        if (!(target instanceof HTMLInputElement) || !target.form) return;
        e.preventDefault();

        const digits = e.clipboardData.getData("text").replace(/\D/g, "");
        if (!digits) return;

        const inputs = Array.from(target.form.querySelectorAll('input:not([type="hidden"])')) as HTMLInputElement[];
        const start = inputs.indexOf(target);

        digits.slice(0, inputs.length - start).split("").forEach((digit, i) => {
        inputs[start + i].value = digit;
        });

        inputs[Math.min(start + digits.length, inputs.length - 1)].focus();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
        const target = e.target;
        if (!(target instanceof HTMLInputElement)) return;
        if (e.key === "Backspace" && !target.value && target.form) {
            const inputs = Array.from(target.form.querySelectorAll('input:not([type="hidden"])')) as HTMLInputElement[];
            const index = inputs.indexOf(target);
            if (index > 0) {
                inputs[index - 1].focus();
            }
        }
    };

    function handleInput(e: React.ChangeEvent<HTMLFormElement>) {
        const target = e.target;
        if (!(target instanceof HTMLInputElement)) return;
        const value = target.value.replace(/[^0-9]/g, "").slice(-1);
        target.value = value;

        if (value && target.form) {
            const inputs = Array.from(target.form.querySelectorAll('input:not([type="hidden"])')) as HTMLInputElement[];
            const index = inputs.indexOf(target);
            if (index !== -1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }
    };

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const codeData = Object.fromEntries(formData.entries());
        const code = Object.values(codeData).join("");
        setIsLoading(true);
        const response = await verifyUser(code);
        router.refresh()
        
        if (response.error) {
            setErrorMessage(response.error);
        } else {
            setIsVerification(false);
            setErrorMessage("");
            Cookies.set("accessToken",response.token,{
                expires: 1,
                secure: true,
                sameSite: "strict"
            })
        }
        setIsLoading(false);
    }

    return {
        isLoading,
        errorMessage,
        handlePaste,
        handleKeyDown,
        handleInput,
        handleSubmit
    }
}