'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar as CalendarIcon } from "lucide-react"
import { useGreeting } from "@/hooks/useGreeting"
import { Skeleton } from "./ui/skeleton"
import { Card } from "./ui/card"
import { useSchedules } from "@/hooks/useSchedules"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Dispatch, SetStateAction, useState } from "react"
import { DateIndicator } from "./date-indicator"
import { ptBRCapitalized } from "@/lib/pt-br-capitalized"

type UserGreetingProps = {
    selectedDate: Date | undefined
    setSelectedDate: Dispatch<SetStateAction<Date | undefined>>
}

export function UserGreeting({ selectedDate, setSelectedDate }: UserGreetingProps) {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const {
        userName,
        greeting,
    } = useGreeting()

    const { isLoading } = useSchedules()

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <Avatar>
                    <AvatarImage src="https://github.com/tiagobarross.png" />
                    <AvatarFallback>
                        <Card>
                            <Skeleton className="w-[40px] h-[40px] rounded-full" />
                        </Card>
                    </AvatarFallback>
                </Avatar>

                <div className="flex gap-2 justify-center items-center">
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                        <DateIndicator selectedDate={selectedDate} />
                        <PopoverTrigger asChild>
                            <Button
                                className="bg-[#1577E0] w-[30px] h-[30px] text-white rounded-md"
                                onClick={() => setIsCalendarOpen(true)}
                            >
                                <CalendarIcon size={20} />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date: Date | undefined) => {
                                    setSelectedDate(date)
                                    setIsCalendarOpen(false)
                                }}
                                initialFocus
                                className="rounded-lg border bg-white p-3 shadow"
                                locale={ptBRCapitalized}
                                classNames={{
                                    head_row: "grid grid-cols-7 gap-0 w-full justify-items-center",
                                    head_cell: "text-sm font-normal text-gray-500 w-10 flex items-center justify-center",
                                    day: "h-10 w-10 text-sm rounded-md",
                                    day_selected: "bg-[#1577E0] text-white hover:bg-blue-600",
                                    day_today: "border border-[#1577E0]",
                                    caption: "text-center text-base font-medium",
                                    nav: "flex items-center justify-between mb-2",
                                    row: "grid grid-cols-7 gap-0 w-full mt-2 justify-items-center",
                                    cell: "text-center",
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div>
                {isLoading ? (
                    <div className="space-y-2">
                        {[...Array(2)].map((_, i) => (
                            <Skeleton key={i} className="h-[36px] w-[150px] rounded-md" />
                        ))}
                    </div>
                ) : (
                    <>
                        <p className="text-4xl">{greeting}</p>
                        <p className="text-4xl font-bold">{userName}</p>
                    </>
                )}
            </div>
        </div>
    )
}

