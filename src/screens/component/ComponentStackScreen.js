import React from 'react';
import ComponentScreen from './ComponentScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { defaultScreenOptions } from '../../constants/settings';

const ComponentStack = createStackNavigator();
const ComponentStackScreen = () => (
  <ComponentStack.Navigator screenOptions={defaultScreenOptions}>
    <ComponentStack.Screen name="Component" component={ComponentScreen} />
  </ComponentStack.Navigator>
);

export default ComponentStackScreen;
