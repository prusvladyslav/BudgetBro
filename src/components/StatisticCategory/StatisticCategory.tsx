import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../common';
import { TExpenseStatisticItem } from '@types';

export const StatisticCategory = ({ item }: { item: TExpenseStatisticItem }) => {
    const { category, percent, total, length } = item;
    const navigation = useNavigation();

    return (
        <View>
            <Pressable style={styles.expenseContent} onPress={() => navigation.navigate('StatisticItem' as never, { data: category } as never)}>
                <View style={styles.iconTitleWrapper}>
                    <Icon name={category} />
                    <View>
                        <Text style={styles.category}>{category}</Text>
                        <Text style={styles.length}>{length} {`expense${length > 1 ? 's' : ''}`}</Text>
                    </View>
                </View>
                <View style={styles.totalPercent}>
                    <Text style={styles.category}>-{total}</Text>
                    <Text style={styles.category}>{percent}</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    iconTitleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    length: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '300',
    },
    category: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    expenseContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
    },
    totalPercent: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
});
