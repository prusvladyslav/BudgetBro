import { ASYNC_STORE_KEY } from "@constants/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TTerm, TTermState } from "@types";
export async function saveData({ key = ASYNC_STORE_KEY, totalBudget, term, termState, askForCategory,customCategories}: { key: string, totalBudget: number, term: TTerm, termState: TTermState, askForCategory: boolean, customCategories: string[] }): Promise<void> {
    try {
        const data = { totalBudget: totalBudget, term: term, termState: termState, askForCategory: askForCategory,customCategories}
        const dataString = JSON.stringify(data);
        await AsyncStorage.setItem(key, dataString);
    } catch (error) {
        console.log(error);
    }
}