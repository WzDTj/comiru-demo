import React from 'react';
import ProfileScreen from './ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { defaultScreenOptions } from '../../constants/settings';

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={defaultScreenOptions}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
