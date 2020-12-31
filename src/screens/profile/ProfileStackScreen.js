import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import AgreementScreen from './AgreementScreen';
import colors from '../../constants/colors';

const ProfileStack = createStackNavigator();

const screenOptions = {
  headerTintColor: colors.text,
  headerStyle: { backgroundColor: colors.primary },
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Agreement" component={AgreementScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
