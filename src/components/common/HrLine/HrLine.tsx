import React from "react"
import { View, StyleSheet } from 'react-native'
export const HrLine = ({ bgColor = 'grey' }) => {
    const styles = StyleSheet.create({
        line: {
            height: 1,
            marginHorizontal: 10,
            backgroundColor: bgColor
        }
    })
    return (
        <View style={styles.line}>

        </View>
    )
}

