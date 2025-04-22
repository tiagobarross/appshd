import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameMonth
} from "date-fns"
import { ptBR } from "date-fns/locale"

export type CustomDate = {
    fullDate: string
    label: string
    date: string
    isCurrentMonth: boolean
}

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

export function getCurrentMonthWeeks(date = new Date()): CustomDate[][] {
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)

    const start = startOfWeek(monthStart, { weekStartsOn: 1 })
    const end = endOfWeek(monthEnd, { weekStartsOn: 1 })

    const dates = eachDayOfInterval({ start, end })

    const formattedDates = dates.map(day => {
        return {
            fullDate: format(day, 'yyyy-MM-dd'),
            label: capitalize(format(day, 'EEEE', { locale: ptBR }).substring(0, 3)),
            date: format(day, 'd'),
            isCurrentMonth: isSameMonth(day, date)
        }
    })

    return Array.from({ length: Math.ceil(formattedDates.length / 7) }, (_, i) =>
        formattedDates.slice(i * 7, (i + 1) * 7)
    )
}