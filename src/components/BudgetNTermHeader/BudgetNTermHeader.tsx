import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { eachDayOfInterval, isAfter, startOfToday } from "date-fns";
import { observer } from "mobx-react-lite";
import store from "../../stores/store";

export const BudgetNTermHeader: React.FC<{ expenseAmmountStr: string }> = observer(({ expenseAmmountStr }) => {
  const navigation = useNavigation();
  const todayString = startOfToday().toISOString();

  function getTermText() {
    if (!isAfter(new Date(todayString), new Date(store.term.endDate as string))) {
      const distanceToToday = eachDayOfInterval({ start: new Date(todayString), end: new Date(store.term.endDate as string) }).length;
      return ` for ${distanceToToday} day${distanceToToday !== 1 ? 's' : ''}`;
    }
  }

  function getCalculatedTotalBudget() {
    return (store.totalBudget as number) - Number(expenseAmmountStr) - store.getAllExpensesTotalValue();
  }

  function getHeaderText() {
    if (!store.term.endDate || !store.totalBudget) {
      return <Text style={styles.budgetValue}>Select budget & term</Text>;
    }
    if (getCalculatedTotalBudget() <= 0) {
      return <Text style={styles.budgetValue}>No budget left</Text>;
    }
    return (
      <Text style={styles.budgetValue}>
        {getCalculatedTotalBudget()}
        <Text style={styles.termValue}>{getTermText()}</Text>
      </Text>
    );
  }

  return (
    <Pressable style={styles.budgetContainer} onPress={() => navigation.navigate('Settings' as never, {} as never)}>
      {getHeaderText()}
      <Ionicons name="settings-sharp" size={24} color="white" />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  budgetContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  budgetValue: {
    color: "#fff",
    fontSize: 22,
    textAlign: "right",
    marginRight: 10,
  },
  termValue: {
    fontStyle: 'italic'
  },
});
