// ScheduleCard.tsx
"use client"

import { CalendarCheck2 } from "lucide-react";
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

type Props = {
    selectedDate: string;
};

export function ScheduleCard({ selectedDate }: Props) {
    const { schedules } = useSchedules()

    const formatDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split("/")
        return `${year}-${month}-${day}`
    }

    const filtered = schedules.filter(s => formatDate(s.date) === selectedDate)

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
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8}>
                                    Nenhum agendamento encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
