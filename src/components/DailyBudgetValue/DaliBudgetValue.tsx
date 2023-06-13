import { observer } from 'mobx-react-lite'
import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { dailyBudgetValue, excededBudgetText } from './helpers'
export const DailyBudgetValue = observer(({ expenseAmmountStr }: { expenseAmmountStr: string }) => {
    const isBudgetExceded = () => dailyBudgetValue(expenseAmmountStr) < 0

    const style = StyleSheet.create({
        dailyBudgetValue: {
            color: isBudgetExceded() ? 'red' : '#fff',
            fontSize: 72,
        },
        forToday: {
            color: isBudgetExceded() ? 'red' : '#fff',
            fontSize: 20,
            marginLeft: 5,
        },
        container: {
            marginLeft: 10,
        }
    })
    return (
        <View style={style.container}>
            <Text style={style.dailyBudgetValue}>{isBudgetExceded() ? 0 : dailyBudgetValue(expenseAmmountStr)}</Text>
            <Text style={style.forToday}>{isBudgetExceded() ? excededBudgetText(expenseAmmountStr) : 'For today'}</Text>
        </View>
    )
})

