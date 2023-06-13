// import { todayString } from "@constants/index"
import { startOfToday } from "date-fns"
import { distanceToDayInDays } from "./distanceToDayInDays"

export const generateDailyBudget = (total: number | undefined, term?: { startDate?: string, endDate?: string }, excededBudget = false): number => {
    const todayString = startOfToday().toISOString()
    if (!total || !term?.endDate) return 0
    // if (excededBudget) total / (distanceToDayInDays(todayString, term.endDate) - 1)
    if (excededBudget) return total / (distanceToDayInDays(todayString, term.endDate) - 1)
    return total / distanceToDayInDays(todayString, term.endDate)
}