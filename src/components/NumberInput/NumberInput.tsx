import React, { Dispatch, SetStateAction, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import store from "../../stores/store";
import { startOfToday } from "date-fns";
import { generateDailyBudget } from "@utils/generateDailyBudget";
import { observer } from "mobx-react-lite";
import { addDigit, deleteLastDigit } from "@utils";

import { Button } from "@components/common/Button";
import { CategoryModal } from "@components/CategoryModal";
import { Row } from '@components/common/Row';

export const NumberInput = observer(({ expenseAmmountStr, setexpenseAmmountStr }: { expenseAmmountStr: string, setexpenseAmmountStr: Dispatch<SetStateAction<string>> }) => {
  const todayString = startOfToday().toISOString();
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleInput = (value: string) => {
    setexpenseAmmountStr((state) => addDigit(value, state));
  };

  const handleDelete = () => {
    if (expenseAmmountStr === '0') return;
    setexpenseAmmountStr((state) => deleteLastDigit(state));
    if (expenseAmmountStr.length === 1) {
      setexpenseAmmountStr("0");
    }
  };

  const handleConfirm = () => {
    store.setAddExpense(expenseAmmountStr, todayString);
    if (store.getExpensesByDayValue(todayString) > store.getTermStateByDate(todayString).dailyBudget) {
      const newBudget = generateDailyBudget(store.getBudgetMinusExpensesTotal(), { startDate: todayString, endDate: store.term.endDate }, true).toFixed(0);
      store.setModifyTermStateDailyBudget(newBudget);
    }
    setexpenseAmmountStr('0');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.value}>{expenseAmmountStr}</Text>
      <Row>
        <Button
          text="C"
          theme="secondary"
          onPress={handleDelete}
        />
        <Button
          text="="
          theme="primary"
          disabled={expenseAmmountStr === '0' || store.termState.length === 0}
          onPress={() => (store.askForCategory ? handleOpenModal() : handleConfirm())}
        />
      </Row>
      {/* Number */}
      <Row>
        <Button text="7" onPress={() => handleInput("7")} />
        <Button text="8" onPress={() => handleInput("8")} />
        <Button text="9" onPress={() => handleInput("9")} />
      </Row>
      <Row>
        <Button text="4" onPress={() => handleInput("4")} />
        <Button text="5" onPress={() => handleInput("5")} />
        <Button text="6" onPress={() => handleInput("6")} />
      </Row>
      <Row>
        <Button text="1" onPress={() => handleInput("1")} />
        <Button text="2" onPress={() => handleInput("2")} />
        <Button text="3" onPress={() => handleInput("3")} />
      </Row>
      <Row>
        <Button text="0" onPress={() => handleInput("0")} />
        <Button text="." onPress={() => handleInput(".")} />
      </Row>
      <Row>

      </Row>
      <CategoryModal setexpenseAmmountStr={setexpenseAmmountStr} expenseAmmountStr={expenseAmmountStr} modalVisible={modalVisible} handleCloseModal={handleCloseModal} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 9,
    justifyContent: "flex-end",
  },
  value: {
    color: "#fff",
    fontSize: 42,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
});
