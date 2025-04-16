import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/lib/axios";

export function useLogout() {
    const router = useRouter();

    async function handleLogout() {
        try {
            await api.post("/auth/signout", {}, { withCredentials: true });
            router.push("/login");
        } catch (error) {
            toast.error("Erro ao fazer logout");
            console.error("Logout error:", error);
        }
    }

    return { handleLogout };
}