import { HrLine } from '@components/common/HrLine';
import { Text, View, StyleSheet, Dimensions, TextInput, Platform } from 'react-native'
import store from '../../stores/store';
import { Dropdown } from '@components/common/Dropdown';
import { generateDatesArray } from '@utils';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { generateTermState } from '@utils/generateTermState';
import { observer } from 'mobx-react-lite';
import { generateDailyBudget } from '@utils/generateDailyBudget';
import { CheckBox, Icon } from '@rneui/themed';
import { CustomModal } from '@components';
import { startOfToday } from 'date-fns';
export const Settings = observer(({ }) => {
    const todayString = startOfToday().toISOString()
    const navigation = useNavigation()
    const dropdownItems = generateDatesArray()
    const [termValue, setTermValue] = useState<string | undefined>(store.term.endDate)
    const getInitialBudget = () => store.totalBudget ? String(store.totalBudget - store.getAllExpensesTotalValue()) : '0'
    const [budgetAmmount, setBudgetAmmount] = useState<string | undefined>(getInitialBudget())
    const handleSave = () => {
        if (!budgetAmmount || !termValue || budgetAmmount === '0') return
        store.setTerm(todayString, termValue as string)
        store.setBudget(budgetAmmount)
        store.setTermState(generateTermState(store.term as { startDate: string, endDate: string }))
        navigation.navigate('Home' as never)
    }
    function handleCancel() {
        navigation.navigate('Home' as never)
    }
    function dailyBudgetText() {
        if (!budgetAmmount || !termValue || budgetAmmount === '0') return 'Select budget and term'
        return `${generateDailyBudget(Number(budgetAmmount), { startDate: todayString, endDate: termValue }).toFixed(0)} for day`
    }




    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const [customCategory, setCustomCategory] = useState('')
    return (
        <View style={styles.wrapper}>
            <View style={styles.headerContainer}>
                <Text style={{
                    color: "#fff",
                    fontSize: 22,
                    textAlign: "left",
                }} onPress={() => handleCancel()}>Back</Text>
                <Text style={{
                    color: termValue && budgetAmmount && budgetAmmount !== '0' ? 'orange' : 'grey',
                    fontSize: 22,
                    textAlign: "left",
                }}
                    onPress={() => handleSave()}
                >Set budget</Text>
            </View>
            <HrLine />
            <View style={{
                flexDirection: 'column',
            }}>
                <View style={styles.budgetTermContainer}>
                    <Text style={styles.title}>Ammount</Text>
                    <View style={{ flex: 7 }}>
                        <TextInput value={budgetAmmount} onChangeText={setBudgetAmmount} keyboardType='numeric' style={styles.budgetTitle} />
                        <Text style={styles.dailyBudgetTitle}>
                            {dailyBudgetText()}
                        </Text>
                    </View>
                </View>
                <HrLine />
                <View style={styles.budgetTermContainer}>
                    <Text style={styles.title}>Term</Text>
                    <Text style={styles.termTitle}>to <Dropdown dropdownValue={termValue} setDropdownValue={setTermValue} items={dropdownItems} placeholderLabel={''} /></Text>
                </View>
            </View>
            <View style={styles.buttonWrapper}>
                <Text style={styles.buttonTitle} onPress={() => handleOpenModal()}>Add custom category</Text>
                <Text style={styles.buttonTitle} onPress={() => store.setCustomCategories([])}>Delete custom categories</Text>
            </View>
            <View style={styles.settingWrapper}>
                <CheckBox
                    center
                    containerStyle={{ backgroundColor: 'none', margin: 0, padding: 0 }}
                    checked={store.askForCategory}
                    onPress={() => store.setAskForCategory(!store.askForCategory)}
                />
                <Text style={styles.settingTitle}>Ask for category</Text>
            </View>
            <CustomModal onSave={() => { store.setAddCustomCategory(customCategory); handleCloseModal() }} isAllowedSave={true} visible={modalVisible} onClose={() => handleCloseModal()}>
                <View>
                    <Text style={styles.modalTitle}>Pick a category for this expense</Text>
                    <TextInput value={customCategory} placeholderTextColor="#999" placeholder='Category name' onChangeText={setCustomCategory} style={styles.textInput} />
                </View>
            </CustomModal>
        </View>
    )
})
const screen = Dimensions.get("window");

const styles = StyleSheet.create({
    buttonWrapper: {
        paddingHorizontal: 10,
        marginVertical: 10
    },
    buttonTitle: {
        color: 'orange',
        fontSize: 20,
        marginVertical: 10,
    },
    settingWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    settingTitle: {
        color: 'white',
        fontSize: 20
    },
    budgetTermContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: 'flex-start'
    },
    title: {
        color: "grey",
        fontSize: 22,
        lineHeight: 22,
        flex: 3
    },
    budgetTitle: {
        color: "#fff",
        fontSize: 52,
        lineHeight: 55,
    },
    termTitle: {
        fontSize: 22,
        lineHeight: 22,
        color: 'orange',
        flex: 7,
        paddingTop: Platform.OS === 'android' ? 10 : 0,
    },
    dailyBudgetTitle: {
        color: "#fff",
        fontSize: 18
    },
    wrapper: {
        paddingVertical: Math.floor(7 * screen.height / 100),
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#202020",

    },
    headerContainer: {
        paddingBottom: 15,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    modalTitle: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 10
    },
    textInput: {
        marginTop: 20,
        color: "#fff",
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 22,
        lineHeight: 22,
    }
});