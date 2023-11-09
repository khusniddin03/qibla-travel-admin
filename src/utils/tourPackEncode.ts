import { IDate } from "@/interfaces";

interface IDates {
    [key: string]: {
        people_count: number;
        duration: number;
    }
}

export const tourPackEncode = (dates: IDate[]): IDates => {
    const endcodeDates = dates.reduce((acc: IDates, {date, people_count, duration}: IDate) => {
        acc[date] = {
            people_count,
            duration
        }
        return acc;
    }, {})
    return endcodeDates;
}
