import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import colors from '../../constants/colors';

const HomeStack = createStackNavigator();

const screenOptions = {
  headerTintColor: colors.text,
  headerStyle: { backgroundColor: colors.primary },
};

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
