export function getCurrentWeek() {
    const today = new Date()
    const week: { label: string; date: number; fullDate: string }[] = []

    const startOfWeek = new Date(today)
    const dayOfWeek = today.getDay()
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    startOfWeek.setDate(today.getDate() + diffToMonday)

    const weekLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek)
        date.setDate(startOfWeek.getDate() + i)

        week.push({
            label: weekLabels[i],
            date: date.getDate(),
            fullDate: date.toISOString().split('T')[0],
        })
    }

    return week
}
