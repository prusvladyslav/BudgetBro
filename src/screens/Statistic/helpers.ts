import store from '../../stores/store'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from "uuid"
import { TExpenseStatistic, TExpenseItem } from '@types'
export const getExpensesByCategories = (): TExpenseStatistic => {
    const expenses = store.getAllExpenses()
    const totalExpenses = store.getAllExpensesTotalValue();

    const result = Object.values(expenses.reduce((acc, curr) => {
        if (curr.category) {
            if (acc[curr.category]) {
                acc[curr.category].items.push(curr);
                acc[curr.category].total += curr.value;
                acc[curr.category].length += 1;
            } else {
                acc[curr.category] = {
                    category: curr.category,
                    items: [curr],
                    id: uuidv4(),
                    total: curr.value,
                    length: 1
                };
            }
        } else {
            if (acc['uncategorized']) {
                acc['uncategorized'].items.push(curr);
                acc['uncategorized'].total += curr.value;
                acc['uncategorized'].length += 1;
            } else {
                acc['uncategorized'] = {
                    category: 'uncategorized',
                    items: [curr],
                    id: uuidv4(),
                    total: curr.value,
                    length: 1
                };
            }
        }
        return acc;
    }, {}));

    result.forEach(item => {
        item.percent = `${((item.total / totalExpenses) * 100).toFixed(0)}%`;
    });
    result.sort((a, b) => parseFloat(b.percent) - parseFloat(a.percent));


    return result

}