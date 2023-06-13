import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import store from '../../stores/store';

export const NewTerm = observer(() => {
    const navigation = useNavigation();

    function onClose() {
        store.setDefault();
        navigation.navigate('Settings' as never);
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.congratulations}>
                Congratulations, your budget term has come to an{' '}
                <Text style={{ color: 'orange' }}>end</Text>
            </Text>
            <View style={styles.statisticsWrapper}>
                {store.totalBudget !== null && (
                    <Text style={styles.statistics}>
                        You saved{' '}
                        <Text style={styles.savedAmount}>
                            {store.totalBudget as number - store.getAllExpensesTotalValue()}
                        </Text>
                    </Text>
                )}
                <View style={styles.buttonWrapper}>
                    <Text
                        style={styles.button}
                        onPress={() => navigation.navigate('Statistic' as never)}
                    >
                        Check statistics
                    </Text>
                    <Text
                        style={styles.button}
                        onPress={() => onClose()}
                    >
                        Set new budget
                    </Text>
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    buttonWrapper: {
        marginBottom: 15,
    },
    button: {
        marginHorizontal: 10,
        fontSize: 20,
        marginBottom: 5,
        color: '#fff',
        fontWeight: '700',
    },
    congratulations: {
        fontSize: 40,
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 10,
        flex: 3,
    },
    savedAmount: {
        fontSize: 30,
        fontWeight: '700',
        color: 'orange',
    },
    wrapper: {
        flex: 1,
        backgroundColor: '#202020',
        alignItems: 'center',
    },
    statistics: {
        marginTop: 25,
        color: '#fff',
        fontSize: 30,
    },
    statisticsWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 8,
    },
});

export default NewTerm;
