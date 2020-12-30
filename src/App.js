import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthStackScreen } from './screens/auth';
import { HomeStackScreen } from './screens/home';
import { ProfileStackScreen } from './screens/profile';

import { AppContext, AppProvider } from './contexts/AppContext';

import { initialState, reducer } from './reducers/index.js';

const tabOptions = {
  home: {
    tabBarLabel: '新闻',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="newspaper-variant-outline" color={color} size={size} />
    ),
  },
  profile: {
    tabBarLabel: '我的',
    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />,
  },
};

const Tab = createBottomTabNavigator();

const LoadingScreen = () => {
  const { state } = useContext(AppContext);
  return (
    <NavigationContainer>
      {state.auth.isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStackScreen} options={tabOptions.home} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} options={tabOptions.profile} />
        </Tab.Navigator>
      ) : (
        <AuthStackScreen />
      )}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AppProvider initialState={initialState} reducer={reducer}>
      <LoadingScreen />
    </AppProvider>
  );
};

export default App;
