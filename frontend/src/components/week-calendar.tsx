import { useEffect, useRef } from "react"
import { getCurrentMonthWeeks } from "@/lib/get-current-month"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { SummaryCard } from "./summary-card"
import { ScheduleCard } from "./schedule-card"
import { format, isSameDay, startOfDay } from "date-fns"
import { RotateCcw } from "lucide-react"

type WeeklyCalendarProps = {
    selectedDate: Date | undefined
    setSelectedDate: (date: Date) => void
}

export default function WeeklyCalendar({ selectedDate, setSelectedDate }: WeeklyCalendarProps) {
    if (!selectedDate) return null

    const isTodaySelected = isSameDay(startOfDay(new Date()), startOfDay(selectedDate))

    const selectedDateString = format(selectedDate, "yyyy-MM-dd")
    const dateParts = selectedDateString.split('-').map(part => parseInt(part))
    const monthDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])
    const weeks = getCurrentMonthWeeks(monthDate)
    const containerRef = useRef<HTMLDivElement>(null)

    const currentWeekIndex = weeks.findIndex(week =>
        week.some(day => day.fullDate === selectedDateString)
    )

    useEffect(() => {
        const container = containerRef.current
        if (
            container &&
            currentWeekIndex >= 0 &&
            currentWeekIndex < container.children.length
        ) {
            const target = container.children.item(currentWeekIndex) as HTMLElement | null
            if (target instanceof HTMLElement) {
                target.scrollIntoView({ behavior: "smooth", inline: "start" })
            }
        }
    }, [currentWeekIndex, selectedDate])

    const handleDayClick = (day: { fullDate: string }) => {
        const [year, month, dayOfMonth] = day.fullDate.split("-").map(Number)
        const clickedDate = startOfDay(new Date(year, month - 1, dayOfMonth))
        setSelectedDate(clickedDate)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="overflow-x-auto scrollbar-hide">
                <div
                    ref={containerRef}
                    className="flex gap-1 w-max snap-x snap-mandatory relative"
                >
                    {weeks.map((week, weekIdx) => (
                        <div
                            key={weekIdx}
                            className="flex gap-1 snap-start scrollbar-hide"
                            style={{ flexShrink: 0 }}
                        >
                            {week.map((day, idx) => {
                                if (!day.isCurrentMonth) return null
                                const isSelected = selectedDateString === day.fullDate

                                return (
                                    <Button
                                        key={idx}
                                        onClick={() => handleDayClick(day)}
                                        className={cn(
                                            "flex flex-col h-16 items-center rounded-xl p-5 transition-colors flex-1 max-w-[51px]",
                                            isSelected ? "bg-[#1577E0] text-white" : "text-black bg-white"
                                        )}
                                    >
                                        <span className="text-xs font-medium">{day.label}</span>
                                        <span className="text-lg font-bold">{day.date}</span>
                                    </Button>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>

            <SummaryCard selectedDate={selectedDateString} />
            <ScheduleCard selectedDate={selectedDateString} />

            {!isTodaySelected && (
                <div className="absolute self-end right-4 bottom-20">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDate(startOfDay(new Date()))}
                        className="gap-2 bg-[#1577E0] text-white"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Hoje
                    </Button>
                </div>
            )}
        </div>
    )
}
