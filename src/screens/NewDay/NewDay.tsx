import React from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { startOfToday } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { generateDailyBudget } from '@utils/generateDailyBudget';
import { v4 as uuidv4 } from 'uuid';
import { HrLine } from '@components/common/HrLine';
import store from '../../stores/store';

export const NewDay = observer(({ route: { params: { saved } } }: { route: any }) => {
    const navigation = useNavigation();
    const today = startOfToday().toISOString();
    const todayTermState = store.getTermStateByDate(today);
    const spentEverythingBudgetCalculated = Number(todayTermState?.dailyBudget.toFixed(0)) + saved;
    const newDailyBudgetCalculated = generateDailyBudget(store.totalBudget, store.term).toFixed(1);
    const savingTotalCalculated = store.getSavingTotalAmmount() + saved;

    function onClose() {
        store.setEditTermStateProperty(todayTermState.id, 'budgetRecalculated', true);
        navigation.navigate('Home' as never);
    }

    function handleSpentEverything() {
        store.setEditTermStateProperty(todayTermState.id, 'dailyBudget', String(spentEverythingBudgetCalculated));
        onClose();
    }

    function handleIncreaseBudget() {
        store.setModifyTermStateDailyBudget(newDailyBudgetCalculated);
        onClose();
    }

    function handleSave() {
        store.setAddSavings({ value: saved, id: uuidv4(), timeStamp: new Date() });
        onClose();
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.congratulations}>
                Congratulations, yesterday you saved <Text style={styles.savedAmount}>{saved}</Text>!
            </Text>

            <View style={{ marginBottom: 20 }}>
                <Pressable style={styles.buttonWrapper} onPress={() => handleSpentEverything()}>
                    <Text style={styles.button}>Spent everything today</Text>
                    <Text style={styles.disclaimer}>
                        today's budget will be <Text style={styles.amount}>{spentEverythingBudgetCalculated}</Text>
                    </Text>
                </Pressable>
                <HrLine />

                <Pressable style={styles.buttonWrapper} onPress={() => handleIncreaseBudget()}>
                    <Text style={styles.button}>Increase daily budget</Text>
                    <Text style={styles.disclaimer}>
                        everyday's budget will be <Text style={styles.amount}>{newDailyBudgetCalculated}</Text>
                    </Text>
                </Pressable>
                <HrLine />

                <Pressable style={styles.buttonWrapper} onPress={() => handleSave()}>
                    <Text style={styles.button}>Save it</Text>
                    <Text style={styles.disclaimer}>
                        your saving will be equal to <Text style={styles.amount}>{savingTotalCalculated}</Text>
                    </Text>
                </Pressable>
            </View>
        </View>
    );
});

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    buttonWrapper: {
        marginVertical: 15,
    },
    button: {
        marginHorizontal: 10,
        fontSize: 20,
        marginBottom: 5,
        color: '#fff',
        fontWeight: '700',
    },
    disclaimer: {
        fontSize: 15,
        color: '#fff',
        marginHorizontal: 10,
        fontStyle: 'italic',
    },
    congratulations: {
        fontSize: 40,
        color: '#fff',
        textAlign: 'center',
    },
    savedAmount: {
        fontSize: 50,
        fontWeight: '700',
        color: 'orange',
    },
    amount: {
        fontSize: 20,
        fontWeight: '600',
        fontStyle: 'normal',
        color: 'orange',
    },
    wrapper: {
        paddingVertical: Math.floor(10 * screen.height / 100),
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#202020',
    },
});
