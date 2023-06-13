import { generateDailyBudget } from "@utils/generateDailyBudget";
import { startOfToday } from "date-fns";
import store from "../../stores/store";

export const dailyBudgetValue = (expenseAmmountStr: string): number => {
    const todayString = startOfToday().toISOString();
    const todayDailyBudget = store.getTermStateByDate(todayString)?.dailyBudget || 0;

    const inputExpense = +expenseAmmountStr;
    const expensesByDayValue = +store.getExpensesByDayValue(todayString);
    return +(todayDailyBudget - inputExpense - expensesByDayValue).toFixed(0);
};

export const excededBudgetText = (expenseAmmountStr: string): string => {
    if (store.totalBudget && store.totalBudget - store.getAllExpensesTotalValue() - Number(expenseAmmountStr) < 0) {
        return 'No total budget left';
    }
    const newDailyBudget = generateDailyBudget(store.getBudgetMinusExpensesTotal() - Number(expenseAmmountStr), store.term, true).toFixed(0);
    return `No budget left for today, you are spending total budget, new daily budget: ${newDailyBudget}`;
};
