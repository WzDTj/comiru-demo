import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthStackScreen from './screens/auth/AuthStackScreen';
import HomeStackScreen from './screens/home/HomeStackScreen';
import PhotoStackScreen from './screens/photo/PhotoStackScreen';
import ProfileStackScreen from './screens/profile/ProfileStackScreen';
import { ScanScreen, GallerySelectorScreen } from './screens/common';

import { AppContext, AppProvider } from './contexts/AppContext';

import { initialState, reducer } from './reducers/index.js';
import colors from './constants/colors';

const tabOptions = {
  home: {
    tabBarLabel: 'News',
    tabBarIcon: ({ color, size }) => <Icon name="newspaper-variant-outline" color={color} size={size} />,
  },
  photo: {
    tabBarLabel: 'Photos',
    tabBarIcon: ({ color, size }) => <Icon name="image-outline" color={color} size={size} />,
  },
  profile: {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ color, size }) => <Icon name="account-box-outline" color={color} size={size} />,
  },
};

const tabBarOptions = {
  activeTintColor: colors.primary,
};

const MainTab = createBottomTabNavigator();

const MainTabScreen = () => {
  const { state } = useContext(AppContext);
  const { isLoggedIn } = state.auth;

  if (!isLoggedIn) return <AuthStackScreen />;

  return (
    <MainTab.Navigator tabBarOptions={tabBarOptions}>
      <MainTab.Screen name="Home" component={HomeStackScreen} options={tabOptions.home} />
      <MainTab.Screen name="Photo" component={PhotoStackScreen} options={tabOptions.photo} />
      <MainTab.Screen name="Profile" component={ProfileStackScreen} options={tabOptions.profile} />
    </MainTab.Navigator>
  );
};

const screenOptions = {
  headerTintColor: colors.text,
  headerStyle: { backgroundColor: colors.primary },
  headerLeftContainerStyle: { paddingHorizontal: 16 },
  headerRightContainerStyle: { paddingHorizontal: 16 },
};

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator mode="modal" screenOptions={screenOptions}>
    <RootStack.Screen name="MainTab" component={MainTabScreen} options={{ headerShown: false }} />
    <RootStack.Screen name="Scan" component={ScanScreen} />
    <RootStack.Screen name="GallerySelector" component={GallerySelectorScreen} />
  </RootStack.Navigator>
);

const App = () => {
  return (
    <AppProvider initialState={initialState} reducer={reducer}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
