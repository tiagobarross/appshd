// ScheduleCard.tsx
"use client"

import { CalendarCheck2, Flag } from "lucide-react";
import { useSchedules } from "@/hooks/useSchedules";
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
import { EmptyCard } from "./emptyCard";
import { Skeleton } from "./ui/skeleton";

type Props = {
    selectedDate: string;
};

export function ScheduleCard({ selectedDate }: Props) {
    const { schedules, isLoading } = useSchedules()

    const formatDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split("/")
        return `${year}-${month}-${day}`
    }

    const filtered = schedules?.filter(s => formatDate(s.date) === selectedDate) || []

    return (
        <Card className={cn("")}>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="bg-[#f4f2f9] text-black p-1 rounded-md">
                        <CalendarCheck2 size={20} />
                    </div>
                    <CardTitle>Agendamentos</CardTitle>
                </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
                {isLoading ? (
                    <div className="space-y-2">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-8 w-full rounded-md" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <EmptyCard />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Hora</TableHead>
                                <TableHead>Paciente</TableHead>
                                <TableHead>Telefone</TableHead>
                                <TableHead>Convênio</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Procedimento</TableHead>
                                <TableHead>Profissional</TableHead>
                                <TableHead>Obs</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((s, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{s.time}</TableCell>
                                    <TableCell>{s.clientName}</TableCell>
                                    <TableCell>{s.clientPhone}</TableCell>
                                    <TableCell>{s.conventionName}</TableCell>
                                    <TableCell>{s.status}</TableCell>
                                    <TableCell>{s.procedureName}</TableCell>
                                    <TableCell>{s.professionalName}</TableCell>
                                    <TableCell>-</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )

}
