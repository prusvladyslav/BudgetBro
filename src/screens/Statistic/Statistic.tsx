import { StatisticCategory } from '@components';
import { useNavigation } from '@react-navigation/native';
import { TExpenseStatisticItem } from '@types';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native'
import store from '../../stores/store'
import { getExpensesByCategories } from './helpers';
export const Statistic = observer(({ }) => {
    const navigation = useNavigation()
    const renderItem = ({ item }: { item: TExpenseStatisticItem }) => <StatisticCategory item={item} />;

    return (
        <View style={styles.wrapper}>
            <View style={styles.headerContainer}>
                <Text style={{
                    color: "orange",
                    fontSize: 22,
                    textAlign: "left",
                }} onPress={() => navigation.goBack()}>Back</Text>
            </View>
            <View>
                <Text style={styles.budgetTitle}>Total expenses for this term: <Text style={styles.budgetAmmount}>{store.getAllExpensesTotalValue()}</Text></Text>
            </View>
            <FlatList
                data={getExpensesByCategories()}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id}
            />
        </View>
    )
})


const screen = Dimensions.get("window");

const styles = StyleSheet.create({
    title: {
        color: "grey",
        fontSize: 22,
        lineHeight: 22,
        flex: 3
    },
    budgetTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: '700',
    },
    budgetAmmount: {
        color: 'orange',
        fontWeight: '900'
    },
    wrapper: {
        paddingVertical: Math.floor(7 * screen.height / 100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#202020",
        paddingHorizontal: 10

    },
    headerContainer: {
        paddingBottom: 15,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    }
});