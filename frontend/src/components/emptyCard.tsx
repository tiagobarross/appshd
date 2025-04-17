// ScheduleCard.tsx
"use client"

import { Flag } from "lucide-react";

export function EmptyCard() {
    return (
        <div className="flex flex-col justify-center items-center gap-1">
            <Flag size={20} className="text-[#1577E0]" />
            Nenhum agendamento encontrado.
        </div>
    )
}
