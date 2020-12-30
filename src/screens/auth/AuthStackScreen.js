import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
