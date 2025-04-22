"use client"

import { useState } from "react"
import { UserGreeting } from "./user-greeting"
import WeeklyCalendar from "./week-calendar"

export default function HomeContent() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

    return (
        <div className="flex flex-col gap-4">
            <UserGreeting selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <WeeklyCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>
    )
}
