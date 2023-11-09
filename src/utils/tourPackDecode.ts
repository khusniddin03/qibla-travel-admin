import { IDate } from "@/interfaces";

interface IDates {
    [key: string]: {
        people_count: number;
        duration: number;
    }
}

export const tourPackDecode = (dates: IDates): IDate[] => {
    const endcodeDates = Object.entries(dates).map(([key, date]: [string, { people_count: number; duration: number }]) => {
        return {
            date: key,
            ...date
        }
    })
    return endcodeDates;
}
