import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen';
import ScanScreen from '../common/ScanScreen';

const screenOptions = {
  headerLeftContainerStyle: { paddingHorizontal: 24 },
  headerRightContainerStyle: { paddingHorizontal: 24 },
};
const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={screenOptions} initialRouteName="Login" mode="modal">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Scan" component={ScanScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
