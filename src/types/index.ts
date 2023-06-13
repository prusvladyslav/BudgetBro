import { CategoriesEnum } from "@constants/index"

export type TExpenseItem = {
    timeStamp: string,
    value: number,
    id: string,
    comment?: string,
    category?: CategoriesEnum
}
export type TSavingItem = {
    timeStamp: string,
    value: number,
    id: string,
    comment?: string,
    category?: string
}
export type TTermStateItem = {
    id: string,
    timeStamp: string,
    dailyBudget: number,
    budgetRecalculated: boolean,
    expenses: TExpenseItem[],
    savings: TSavingItem[]
}
export type TTermState = TTermStateItem[]

export type TTerm = { startDate?: string, endDate?: string }
export type TExpenseStatisticItem = { category: CategoriesEnum, id: string, items: TExpenseItem[], percent: string, total: number, length: number }
export type TExpenseStatistic = TExpenseStatisticItem[]