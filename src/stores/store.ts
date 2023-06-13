import { autorun, makeAutoObservable, reaction } from 'mobx'
import { v4 as uuidv4 } from "uuid"
import { TExpenseItem, TTerm, TTermState, TTermStateItem } from '@types'
// import { todayString } from '@constants/index'
import { saveData } from '@utils/asyncStore/saveData'
import { startOfToday } from 'date-fns'
class Store {
    constructor() {
        makeAutoObservable(this)
        reaction(() => [this.term, this.termState, this.totalBudget, this.askForCategory, this.customCategories], ([term, termState, totalBudget, askForCategory, customCategories]) => {
            saveData({ totalBudget, termState, term, askForCategory, customCategories })
        })
    }
    totalBudget: number | undefined = undefined
    savings = []
    setBudget(value: string): void {
        this.totalBudget = Number(value)
    }
    getBudgetMinusExpensesTotal() {
        if (this.totalBudget) {
            return this.totalBudget - this.getAllExpensesTotalValue()
        }
        return 0
    }
    term: TTerm = { startDate: undefined, endDate: undefined }
    setTerm(startDate: string, endDate: string) {
        this.term = { startDate, endDate }
    }
    termState: TTermState = []
    setTermState(termState: TTermState) {
        this.termState = termState
    }
    // getTodayBudget() {
    //     return this.termState.find(item => item.timeStamp === todayString)?.dailyBudget || 0
    // }
    setAddExpense(value: string, todayString: string, category?: string, comment?: string,): void {
        this.termState = this.termState.map(item => {
            if (item.timeStamp as string === todayString) {
                return {
                    ...item,
                    expenses: [...item.expenses, {
                        value: Number(value),
                        timeStamp: new Date(),
                        id: uuidv4(),
                        ...(!!category && { category: category }),
                        ...(!!comment && { comment: comment }),
                    }]
                }
            }
            return item
        })
    }
    getAllExpensesTotalValue(): number {
        return this.termState?.reduce((accumulator, currentObject) => {
            currentObject.expenses.forEach(expense => {
                accumulator += expense.value;
            });
            return accumulator;
        }, 0);
    }
    getExpensesByDayValue(day: string): number {
        if (this.termState?.length > 0) {
            return this.termState.filter(item => item.timeStamp === day)[0]?.expenses.reduce((acc, item) => acc + item.value, 0)
        }
        return 0
    }
    getExpenseItemsByCategory(category: string) {
        if (this.termState?.length > 0) {
            const allExpenses = this.getAllExpenses()
            if (category === 'uncategorized') {
                return allExpenses.filter(item => !item.category)
            }
            return allExpenses.filter(item => item.category === category)
        }
        return []
    }
    getAllExpenses(): TExpenseItem[] {
        return this.termState.reduce((accumulator, currentObject) => {
            return accumulator.concat(currentObject.expenses);
        }, []).sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
    }
    setModifyExpenseByKey(expenseId: string, key: string, value: string | number): void {
        // Loop through each object in the termState array
        for (let i = 0; i < this.termState.length; i++) {
            const expenses = this.termState[i].expenses;

            // Loop through each expense in the current object's expenses array
            for (let j = 0; j < expenses.length; j++) {
                const expense = expenses[j];

                // Check if the expense ID matches the one we're looking for
                if (expense.id === expenseId) {
                    // Modify the specified key with the new value
                    expense[key] = value;
                }
            }
        }
    }
    setDeleteExpense(id: string): void {
        this.termState = this.termState.map(obj => {
            if (obj.expenses.some(expense => expense.id === id)) {
                // create a new expenses array without the matching object
                const updatedExpenses = obj.expenses.filter(
                    expense => expense.id !== id
                );
                // return a new object with the updated expenses array
                return { ...obj, expenses: updatedExpenses };
            } else {
                // if the object doesn't have the matching id, return it as-is
                return obj;
            }
        });
    }


    getTermStateByDate(date: string): TTermStateItem {
        return this.termState.find(item => item.timeStamp === date)
    }

    setEditTermStateProperty(termStateId: string, property: string, value: any) {
        this.termState = this.termState.map(item => {
            if (item.id === termStateId) {
                return {
                    ...item,
                    [property]: value
                }
            }
            return item
        })
    }
    setModifyTermStateDailyBudget(value: string | number) {
        this.termState = this.termState.map(item => {
            return {
                ...item,
                dailyBudget: +value
            }
        })
    }

    setAddSavings(item) {
        this.savings = [...this.savings, item]
    }
    getSavingTotalAmmount(): number {
        return this.savings.reduce((acc, item) => acc + item.value, 0)
    }

    setDefault() {
        this.term = { startDate: undefined, endDate: undefined }
        this.totalBudget = undefined
        this.termState = []
        // this.askForCategory = true
    }

    customCategories: { value: string, label: string }[] = []
    setAddCustomCategory(category: string) {
        this.customCategories = [...this.customCategories, { value: category, label: category }]
    }
    setCustomCategories(customCategories: { value: string, label: string }[]) {
        this.customCategories = customCategories
    }
    askForCategory = true
    setAskForCategory(value: boolean) {
        this.askForCategory = value
    }

}
export default new Store()

