// SummaryCard.tsx
"use client"

import { ScrollText } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useSchedules } from "@/hooks/useSchedules"
import { EmptyCard } from "./emptyCard"
import { Skeleton } from "./ui/skeleton"

type Props = {
    selectedDate: string;
};

export function SummaryCard({ selectedDate }: Props) {
    const { schedules, isLoading } = useSchedules()

    const formatDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split("/")
        return `${year}-${month}-${day}`
    }

    const filtered = schedules.filter(s => formatDate(s.date) === selectedDate)

    const statusSummary = filtered.reduce(
        (acc, curr) => {
            const status = curr.status
            if (status === "Aguardando") acc.aguardando++
            else if (status === "Agendado") acc.agendado++
            else if (status === "Disponível") acc.disponivel++
            acc.total++
            return acc
        },
        { aguardando: 0, agendado: 0, disponivel: 0, total: 0 }
    )

    return (
        <Card className={cn("bg-white text-black")}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="bg-[#f4f2f9] text-black p-1 rounded-md">
                        <ScrollText size={20} />
                    </div>
                    Resumos
                </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
                {isLoading ? (
                    <div className="space-y-2">
                        {[...Array(2)].map((_, i) => (
                            <Skeleton key={i} className="h-8 w-full rounded-md" />
                        ))}
                    </div>
                ) :

                    filtered.length === 0 ? (
                        <EmptyCard />
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Aguardando</TableHead>
                                    <TableHead>Agendado</TableHead>
                                    <TableHead>Disponível</TableHead>
                                    <TableHead>Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{statusSummary.aguardando}</TableCell>
                                    <TableCell>{statusSummary.agendado}</TableCell>
                                    <TableCell>{statusSummary.disponivel}</TableCell>
                                    <TableCell>{statusSummary.total}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    )}
            </CardContent>
        </Card>
    )
}
