"use client"

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Schedule } from "@/types/schedule";

export function useSchedules() {
    const [schedules, setSchedulings] = useState<Schedule[]>([]);

    useEffect(() => {
        api.get("/schedulings/find")
            .then((response) => {
                setSchedulings(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar agendamentos:", error);
            });
    }, []);

    return { schedules }
}