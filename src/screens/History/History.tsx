import React from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { ExpenseItem } from '@components';
import { TExpenseItem } from '@types';
import store from '../../stores/store';

export const History = observer(() => {
    const navigation = useNavigation();
    const expenses = store.getAllExpenses();
    const renderItem = ({ item }: { item: TExpenseItem }) => <ExpenseItem item={item} />;

    return (
        <View style={styles.wrapper}>
            <View style={styles.headerContainer}>
                <Text style={styles.backButton} onPress={() => navigation.goBack()}>Back</Text>
                <Text style={styles.statisticButton} onPress={() => navigation.navigate('Statistic' as never)}>Statistic</Text>
            </View>
            {expenses.length > 0 ? (
                <FlatList
                    data={expenses}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text style={styles.noExpensesText}>No expenses yet</Text>
            )}
        </View>
    );
});

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: Math.floor(7 * screen.height / 100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#202020',
    },
    headerContainer: {
        paddingBottom: 15,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    backButton: {
        color: 'orange',
        fontSize: 22,
        textAlign: 'left',
    },
    statisticButton: {
        color: 'orange',
        fontSize: 22,
        textAlign: 'right',
    },
    noExpensesText: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: '50%',
        color: '#fff',
    },
});
