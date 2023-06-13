import store from "../stores/store"
import { v4 as uuidv4 } from "uuid"
import { generateDatesArray } from "./generateDatesArray"
import { distanceToDayInDays } from './distanceToDayInDays'
import { startOfToday } from 'date-fns'
// import { todayString } from '@constants/index'
import { generateDailyBudget } from './generateDailyBudget'
import { TTerm, TTermState } from '@types'

export const generateTermState = (term: TTerm): TTermState => {
    const todayString = startOfToday().toISOString()

    const distanceToToday = distanceToDayInDays(todayString, term.endDate as string)
    return generateDatesArray(distanceToToday).map((item, index) => {
        return {
            id: uuidv4(),
            timeStamp: item.value,
            dailyBudget: generateDailyBudget(store.totalBudget, store.term),
            budgetRecalculated: index === 0,
            expenses: [],
            savings: []
        }
    })
}