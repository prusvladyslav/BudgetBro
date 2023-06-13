import { ASYNC_STORE_KEY } from "@constants/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function killHistory(key = ASYNC_STORE_KEY): Promise<void> {
    try {
        const data = {}
        const dataString = JSON.stringify(data);
        await AsyncStorage.setItem(key, dataString);
    } catch (error) {
        console.log(error);
    }
}