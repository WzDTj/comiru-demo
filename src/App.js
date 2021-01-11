import React, { useContext } from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthStackScreen from './screens/auth/AuthStackScreen';

import HomeStackScreen from './screens/home/HomeStackScreen';
import ComponentStackScreen from './screens/component/ComponentStackScreen';
import PhotoStackScreen from './screens/photo/PhotoStackScreen';
import ProfileStackScreen from './screens/profile/ProfileStackScreen';

import homeScreens from './screens/home';
import photoScreens from './screens/photo';
import profileScreens from './screens/profile';

import { ScanScreen, GallerySelectorScreen } from './screens/common';

import { AppContext, AppProvider } from './contexts/AppContext';

import { initialState, reducer } from './reducers/index.js';
import colors from './constants/colors';
import { defaultScreenOptions } from './constants/settings';

const styles = StyleSheet.create({
  tabBarLabel: { lineHeight: 20 },
});

const tabOptions = {
  home: {
    tabBarLabel: <Text style={styles.tabBarLabel}>News</Text>,
    tabBarIcon: ({ color, size }) => <Icon name="newspaper-variant-outline" color={color} size={24} />,
  },
  component: {
    tabBarLabel: <Text style={styles.tabBarLabel}>Components</Text>,
    tabBarIcon: ({ color, size }) => <Icon name="layers-triple-outline" color={color} size={24} />,
  },
  photo: {
    tabBarLabel: <Text style={styles.tabBarLabel}>Photos</Text>,
    tabBarIcon: ({ color, size }) => <Icon name="image-outline" color={color} size={24} />,
  },
  profile: {
    tabBarLabel: <Text style={styles.tabBarLabel}>You</Text>,
    tabBarIcon: ({ color, size }) => <Icon name="account-box-outline" color={color} size={24} />,
  },
};

const MainTab = createMaterialBottomTabNavigator();
const MainTabScreen = () => {
  const { state } = useContext(AppContext);
  const { isLoggedIn } = state.auth;

  if (!isLoggedIn) return <AuthStackScreen />;

  return (
    <MainTab.Navigator
      initialRouteName="Home"
      activeColor={colors.text}
      inactiveColor={colors.text}
      barStyle={{ backgroundColor: colors.primary }}
    >
      <MainTab.Screen name="Home" component={HomeStackScreen} options={tabOptions.home} />
      <MainTab.Screen name="Component" component={ComponentStackScreen} options={tabOptions.component} />
      <MainTab.Screen name="Photo" component={PhotoStackScreen} options={tabOptions.photo} />
      <MainTab.Screen name="Profile" component={ProfileStackScreen} options={tabOptions.profile} />
    </MainTab.Navigator>
  );
};

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator screenOptions={defaultScreenOptions}>
    <MainStack.Screen name="MainTab" component={MainTabScreen} options={{ headerShown: false }} />
    {Object.entries({
      ...homeScreens,
      ...photoScreens,
      ...profileScreens,
    }).map(([name, component]) => (
      <MainStack.Screen key={name} name={name} component={component} />
    ))}
  </MainStack.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator mode="modal" screenOptions={defaultScreenOptions}>
    <RootStack.Screen name="MainStack" component={MainStackScreen} options={{ headerShown: false }} />
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
