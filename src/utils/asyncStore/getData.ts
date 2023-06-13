import { ASYNC_STORE_KEY } from "@constants/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../../stores/store";

export async function getData(key = ASYNC_STORE_KEY) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            const parsedData = JSON.parse(value)
            store.setTerm(parsedData.term.startDate, parsedData.term.endDate)
            // console.log(typeof parsedData.totalBudget);
            store.setBudget(parsedData.totalBudget !== undefined ? parsedData.totalBudget : "0")
            store.setTermState(parsedData.termState)
            store.setAskForCategory(parsedData.askForCategory)
            store.setCustomCategories(parsedData.customCategories)
        }
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
}