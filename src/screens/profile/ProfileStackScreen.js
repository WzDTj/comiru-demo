import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import AgreementScreen from './AgreementScreen';

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Agreement" component={AgreementScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileStackScreen;
