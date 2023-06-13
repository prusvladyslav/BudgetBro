import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { format, isToday, isYesterday, startOfToday } from 'date-fns';
import { observer } from 'mobx-react-lite';
import store from '../../stores/store';
import { HrLine } from '@components/common/HrLine';
import { Icon } from '@components/common/Icon/Icon';
import { generateDailyBudget } from '@utils/generateDailyBudget';
import { TExpenseItem } from '@types';

export const ExpenseItem = observer(({ item }: { item: TExpenseItem }) => {
    const todayString = startOfToday().toISOString();
    const [isEdit, setIsEdit] = useState(false);
    const { value, timeStamp, category, comment, id } = item;
    const valueRef = useRef<string | number>(value);
    const inputRef = useRef<TextInput>(null);

    const formattedDate = () => {
        if (isToday(new Date(timeStamp))) {
            return `Today, ${format(new Date(timeStamp), 'HH:mm')}`;
        } else if (isYesterday(new Date(timeStamp))) {
            return `Yesterday, ${format(new Date(timeStamp), 'HH:mm')}`;
        } else {
            return `${format(new Date(timeStamp), 'dd MMMM yyyy')}, ${format(new Date(timeStamp), 'HH:mm')}`;
        }
    };

    useEffect(() => {
        if (isEdit) inputRef.current?.focus();
    }, [isEdit]);

    return (
        <View>
            <View style={styles.expenseContent}>
                <View style={styles.wrapper}>
                    {isEdit ? (
                        <TextInput
                            style={styles.value}
                            ref={inputRef}
                            onBlur={() => setIsEdit(false)}
                            keyboardType='numeric'
                            onChangeText={(value) => (valueRef.current = value)}
                            defaultValue={String(value)}
                        />
                    ) : (
                        <Text style={styles.value}>{value}</Text>
                    )}
                    <Text style={styles.timeStamp}>{formattedDate()}</Text>
                    {category && (
                        <View style={styles.categoryWrapper}>
                            <Icon styleProp={styles.iconStyle} size={30} name={category} />
                            <Text style={styles.timeStamp}>{category}</Text>
                        </View>
                    )}
                    {comment && <Text style={styles.timeStamp}>{comment}</Text>}
                </View>
                <View style={styles.iconWrapper}>
                    <Entypo
                        name='edit'
                        style={{ marginRight: 10 }}
                        onPress={() => {
                            setIsEdit(!isEdit);
                            if (!!valueRef.current && +valueRef.current > 0) store.setModifyExpenseByKey(id, 'value', valueRef.current);
                        }}
                        size={30}
                        color={isEdit ? 'orange' : 'white'}
                    />
                    <MaterialCommunityIcons
                        name='delete'
                        onPress={() => {
                            const todayTermState = store.getTermStateByDate(todayString);
                            if (todayTermState?.expenses.find((expense) => expense.id === item.id) === undefined) {
                                store.setEditTermStateProperty(todayTermState.id, 'dailyBudget', String(+todayTermState?.dailyBudget + value));
                            }
                            if (store.getExpensesByDayValue(todayString) > store.getTermStateByDate(todayString).dailyBudget) {
                                store.setModifyTermStateDailyBudget(generateDailyBudget(store.getBudgetMinusExpensesTotal() + item.value, store.term, true).toFixed(0));
                            }
                            store.setDeleteExpense(item.id);
                        }}
                        color='white'
                        size={35}
                    />
                </View>
            </View>
            <HrLine />
        </View>
    );
});

const styles = StyleSheet.create({
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    wrapper: {
        flexDirection: 'column',
        margin: 10,
    },
    value: {
        color: '#fff',
        fontSize: 52,
    },
    timeStamp: {
        color: '#fff',
        fontSize: 18,
    },
    expenseContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        marginRight: 5,
    },
});

export default ExpenseItem;
