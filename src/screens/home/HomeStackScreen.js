import React from 'react';
import HomeScreen from './HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { defaultScreenOptions } from '../../constants/settings';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={defaultScreenOptions}>
    <HomeStack.Screen name="Home" component={HomeScreen} />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
