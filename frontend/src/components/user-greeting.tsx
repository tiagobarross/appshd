"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "lucide-react"
import { useGreeting } from "@/hooks/useGreeting"

export function UserGreeting() {
    const {
        userName,
        greeting,
    } = useGreeting()

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <Avatar>
                    <AvatarImage src="https://github.com/tiagobarross.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <button className="bg-[#1577E0] text-white p-1 rounded-md">
                    <Calendar size={20} />
                </button>
            </div>

            <div>
                <p className="text-4xl">{greeting},</p>
                <p className="text-4xl font-bold">{userName}!</p>
            </div>
        </div>
    )
}