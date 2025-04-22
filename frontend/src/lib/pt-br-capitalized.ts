import { ptBR } from 'date-fns/locale';

export const ptBRCapitalized = {
    ...ptBR,
    localize: {
        ...ptBR.localize,
        day: (n: any, options: any) => {
            const day = ptBR.localize.day(n, options);
            return day.charAt(0).toUpperCase() + day.slice(1);
        },
        month: (n: any, options: any) => {
            const month = ptBR.localize.month(n, options);
            return month.charAt(0).toUpperCase() + month.slice(1);
        },
    }
};