
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Gayball from './Screens/gayball';
import Resultados from './Screens/resultados';
import PointV from './Screens/TelaPointV';
const Stack = createStackNavigator();

export default function Navigation(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='PointV'>
      <Stack.Screen name="PointV" options={{headerShown: false}} component={PointV}/>
        <Stack.Screen name="Gayball" options={{headerShown: false}} component={Gayball}/>
        <Stack.Screen name='Resultados' options={{headerShown: false}} component={Resultados}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

