import { eachDayOfInterval } from "date-fns"

export const distanceToDayInDays = (startDate: string, endDate: string): number => {
    return eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) }).length
}