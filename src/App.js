import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthStackScreen } from './screens/auth';
import { HomeStackScreen } from './screens/home';
import { PhotoStackScreen } from './screens/photo';
import { ProfileStackScreen } from './screens/profile';

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

const Tab = createBottomTabNavigator();

const LoadingScreen = () => {
  const { state } = useContext(AppContext);
  return (
    <NavigationContainer>
      {state.auth.isLoggedIn ? (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: colors.primary,
          }}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} options={tabOptions.home} />
          <Tab.Screen name="Photo" component={PhotoStackScreen} options={tabOptions.photo} />
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
