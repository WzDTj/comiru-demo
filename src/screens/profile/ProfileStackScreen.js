import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';
import AgreementScreen from './AgreementScreen';
import UserInfoScreen from './UserInfoScreen';
import { defaultScreenOptions } from '../../constants/settings';

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={defaultScreenOptions}>
    <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    <ProfileStack.Screen name="Agreement" component={AgreementScreen} />
    <ProfileStack.Screen name="UserInfo" component={UserInfoScreen} />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;
