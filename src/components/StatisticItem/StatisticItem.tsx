import React from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { ExpenseItem } from '@components';
import { TExpenseItem } from '@types';
import store from '../../stores/store'
    ;
type StatisticItemRouteParams = {
    params: { data: any; };
    data: string; // Example: category name
};

export const StatisticItem = observer(({ route }: { route: StatisticItemRouteParams }) => {
    const navigation = useNavigation();
    const renderItem = ({ item }: { item: TExpenseItem }) => <ExpenseItem item={item} />;
    const { data: category } = route.params;

    return (
        <View style={styles.wrapper}>
            <View style={styles.headerContainer}>
                <Text style={styles.backButton} onPress={() => navigation.goBack()}>Back</Text>
            </View>
            <View>
            </View>
            <FlatList
                data={store.getExpenseItemsByCategory(category)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
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
        paddingHorizontal: 10
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
    }
});
