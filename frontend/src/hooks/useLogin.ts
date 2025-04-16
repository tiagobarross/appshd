import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/axios";

export function useLogin() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();

        setEmailError("");
        setPasswordError("");

        let hasError = false;

        if (!email.trim()) {
            setEmailError("O e-mail é obrigatório.");
            hasError = true;
        }

        if (!password.trim()) {
            setPasswordError("A senha é obrigatória.");
            hasError = true;
        }

        if (hasError) return;

        try {
            setIsLoading(true);

            const response = await api.post(
                "/auth/signin",
                { email, password, rememberMe },
                { withCredentials: true }
            );

            toast.success("Bem-vindo!");
            router.push("/modules/home");

        } catch (error: any) {
            const message = error.response?.data?.message || "Erro no login";
            toast.error(message);
            console.error("Erro ao logar:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        emailError,
        passwordError,
        isLoading,
        handleLogin,
        rememberMe,
        setRememberMe,
    };
}
