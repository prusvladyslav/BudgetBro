import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, AppState } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import store from '../../stores/store';
import { initialExpenseInputState } from '@constants';
import { BudgetNTermHeader, DailyBudgetValue, NumberInput } from '@components';
import { HrLine } from '@components/common/HrLine';
import { isAfter, startOfToday, startOfYesterday } from 'date-fns';

export const MainScreen = observer(() => {
    const navigation = useNavigation();
    const [expenseAmmountStr, setexpenseAmmountStr] = useState<string>(initialExpenseInputState);
    const appState = useRef(AppState.currentState);
    const [key, setKey] = useState(0);

    useEffect(() => {
        const checkNewDayOrNewTerm = () => {
            const today = startOfToday();
            const todayTermState = store.getTermStateByDate(today.toISOString());
            const yesterday = startOfYesterday();
            const yesterdayExpenses = store.getExpensesByDayValue(yesterday.toISOString());
            const yesterdayBudget = store.getTermStateByDate(yesterday.toISOString())?.dailyBudget;
            const saved = +(Number(yesterdayBudget) - yesterdayExpenses).toFixed(0);

            if (isAfter(today, new Date(store.term.endDate as string))) {
                navigation.navigate('NewTerm' as never);
            }

            if (todayTermState?.budgetRecalculated === false && saved > 0) {
                navigation.navigate('NewDay' as never, { saved: saved } as never);
            }

            setKey((prev) => prev + 1);
        };

        const subscription = AppState.addEventListener('change', (nextAppState) => {
            appState.current = nextAppState;
            if (appState.current === 'active') {
                checkNewDayOrNewTerm();
            }
        });

        checkNewDayOrNewTerm();

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <View style={styles.wrapper} key={key}>
            <View style={styles.headerContainer}>
                <View style={styles.historyButtonContainer}>
                    <Text style={styles.historyButton} onPress={() => navigation.navigate('History' as never)}>History</Text>
                </View>
                <BudgetNTermHeader expenseAmmountStr={expenseAmmountStr} />
            </View>
            <HrLine />
            <DailyBudgetValue expenseAmmountStr={expenseAmmountStr} />
            <NumberInput expenseAmmountStr={expenseAmmountStr} setexpenseAmmountStr={setexpenseAmmountStr} />
        </View>
    );
});

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: Math.floor(5 * screen.height / 100),
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#202020',
    },
    headerContainer: {
        flex: 0.8,
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    historyButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    historyButton: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'left',
    },
});

export default MainScreen;
