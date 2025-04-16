// WeeklyCalendar.tsx
'use client'

import { cn } from "@/lib/utils"
import { getCurrentWeek } from "@/lib/get-current-week"
import { Button } from "./ui/button"
import { useState } from "react"
import { SummaryCard } from "./summary-card"
import { ScheduleCard } from "./schedule-card"

export default function WeeklyCalendar() {
    const week = getCurrentWeek()
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-1">
                {week.map((day, idx) => {
                    const isSelected = selectedDate === day.fullDate;

                    return (
                        <Button
                            key={idx}
                            onClick={() => setSelectedDate(day.fullDate)}
                            className={cn(
                                "flex flex-col h-16 items-center rounded-xl p-5 transition-colors flex-1 min-w-[40]",
                                isSelected ? "bg-[#1577E0] text-white" : "text-black bg-white"
                            )}
                        >
                            <span className="text-xs font-medium">{day.label}</span>
                            <span className="text-lg font-bold">{day.date}</span>
                        </Button>
                    );
                })}
            </div>

            {/* Cards filtrando pela data selecionada */}
            <SummaryCard selectedDate={selectedDate} />
            <ScheduleCard selectedDate={selectedDate} />
        </div>
    )
}
