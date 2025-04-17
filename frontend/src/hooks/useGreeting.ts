import api from "@/lib/axios"
import { useEffect, useState } from "react"

export function useGreeting() {
    const [greeting, setGreeting] = useState("")
    const [userName, setUserName] = useState("")

    useEffect(() => {
        const hour = new Date().getHours()
        if (hour < 12) setGreeting("Bom dia")
        else if (hour < 18) setGreeting("Boa tarde")
        else setGreeting("Boa noite")
    }, [])

    useEffect(() => {
        async function fetchUserName() {
            try {
                const response = await api.get("/auth/me", { withCredentials: true })
                setUserName(response.data.name)
            } catch (error) {
                console.error("Erro ao buscar nome do usuário:", error)
            }
        }

        fetchUserName()
    }, [])

    return {
        greeting,
        setGreeting,
        userName,
        setUserName
    }
}