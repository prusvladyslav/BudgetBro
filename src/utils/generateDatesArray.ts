// import { todayString } from "@constants/index";
import { eachDayOfInterval, format, formatDistanceToNowStrict, isToday, startOfToday } from "date-fns";
import { distanceToDayInDays } from "./distanceToDayInDays";


export function generateDatesArray(term = 40): {value: string,label: string}[] {
    const todayString = startOfToday().toISOString()
    const today = startOfToday()
    const termDaysFromToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + term - 1);
    const termDaysArray = eachDayOfInterval({
        start: today,
        end: termDaysFromToday
    })
    const getLabel = (item: Date) => {
        if (isToday(item)) return 'Today - 1 day'
        const distanceToToday = distanceToDayInDays(todayString, item.toISOString())
        return `${format(item, 'd MMMM')} - ${distanceToToday} days`
    }
    return termDaysArray.map(item => {
        return {
            value: item.toISOString(),
            label: getLabel(item)
        }
    })
}