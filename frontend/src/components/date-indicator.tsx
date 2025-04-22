import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

type DateIndicatorProps = {
    selectedDate: Date | undefined
}

export function DateIndicator({ selectedDate }: DateIndicatorProps) {
    if (!selectedDate) return null

    const formattedDate = format(selectedDate, "MMMM yyyy", { locale: ptBR })

    return (
        <p className="text-lg font-medium capitalize">{formattedDate}</p>
    )
}
