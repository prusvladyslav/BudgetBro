import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainScreen, Settings, History, NewDay, NewTerm, Statistic } from '@screens'
import { getData } from '@utils/asyncStore';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo } from 'react';
import { killHistory } from '@utils/asyncStore/killHistory';
import { StatisticItem } from '@components/StatisticItem/StatisticItem';

// SplashScreen.preventAutoHideAsync();

const App = observer(() => {

  const Stack = createNativeStackNavigator();
  useEffect(() => {
    getData()
    // killHistory()
  }, [])

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name='Home' options={{ headerShown: false }} component={MainScreen} />
        <Stack.Screen name='Settings' options={{ headerShown: false }} component={Settings} />
        <Stack.Screen name='History' options={{ headerShown: false }} component={History} />
        <Stack.Screen name='Savings' options={{ headerShown: false }} component={History} />
        <Stack.Screen name='Statistic' options={{ headerShown: false }} component={Statistic} />
        <Stack.Screen name='StatisticItem' options={{ headerShown: false }} component={StatisticItem} />
        <Stack.Screen name='NewDay' options={{ headerShown: false }} component={NewDay} />
        <Stack.Screen name='NewTerm' options={{ headerShown: false }} component={NewTerm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
})
export default App