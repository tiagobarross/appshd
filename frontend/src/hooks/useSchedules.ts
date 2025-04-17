"use client"

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Schedule } from "@/types/schedule";

export function useSchedules() {
    const [schedules, setSchedulings] = useState<Schedule[]>([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        api.get("/schedulings/find")
            .then((response) => {
                setSchedulings(response.data);
                setIsLoading(false)
            })
            .catch((error) => {
                console.error("Erro ao buscar agendamentos:", error);
            });
    }, []);

    return { schedules, isLoading }
}