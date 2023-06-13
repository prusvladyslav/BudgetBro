import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { Dropdown, CustomModal } from "@components/common";
import { generateDailyBudget } from "@utils/generateDailyBudget";
import store from "../../stores/store";
import { generateCategories } from "./helpers";
import { startOfToday } from "date-fns";

interface CategoryModalProps {
    modalVisible: boolean;
    handleCloseModal: () => void;
    expenseAmmountStr: string;
    setexpenseAmmountStr: Dispatch<SetStateAction<string>>;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ modalVisible, handleCloseModal, expenseAmmountStr, setexpenseAmmountStr }) => {
    const todayString = startOfToday().toISOString();
    const [category, setCategory] = useState<string | undefined>();
    const [comment, setComment] = useState('');

    const handleSave = () => {
        store.setAddExpense(expenseAmmountStr, todayString, category, comment);
        if (store.getExpensesByDayValue(todayString) > store.getTermStateByDate(todayString).dailyBudget) {
            const newBudget = generateDailyBudget(store.getBudgetMinusExpensesTotal(), { startDate: todayString, endDate: store.term.endDate }, true).toFixed(0);
            store.setModifyTermStateDailyBudget(newBudget);
        }
        setexpenseAmmountStr('0');
        handleCloseModal();
    };

    useEffect(() => {
        if (!modalVisible) {
            setCategory(undefined);
            setComment('');
        }
    }, [modalVisible]);

    return (
        <CustomModal onSave={handleSave} isAllowedSave={!!category || !!comment} visible={modalVisible} onClose={handleCloseModal}>
            <View>
                <Text style={styles.modalTitle}>Pick a category for this expense</Text>
                <Dropdown dropdownValue={category} setDropdownValue={setCategory} placeholderLabel='Select a category' items={[...store.customCategories, ...generateCategories()]} />
                <TextInput value={comment} placeholderTextColor="#999" placeholder='Enter comment text' onChangeText={setComment} style={styles.textInput} />
            </View>
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    modalTitle: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 10
    },
    textInput: {
        marginTop: 20,
        color: "#fff",
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 22,
    }
});
