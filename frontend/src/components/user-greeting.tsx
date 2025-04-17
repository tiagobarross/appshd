"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "lucide-react"
import { useGreeting } from "@/hooks/useGreeting"
import { Skeleton } from "./ui/skeleton"
import { Card } from "./ui/card"
import { useSchedules } from "@/hooks/useSchedules"

export function UserGreeting() {
    const {
        userName,
        greeting,
    } = useGreeting()

    const { isLoading } = useSchedules() // <-- corrigido aqui

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

                <button className="bg-[#1577E0] text-white p-1 rounded-md">
                    <Calendar size={20} />
                </button>
            </div>

            <div>
                {isLoading ? (
                    <div className="space-y-2">
                        {[...Array(2)].map((_, i) => (
                            <Skeleton key={i} className="h-[36px] w-[150px] rounded-md bg-[#CCCCCC]" />
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
