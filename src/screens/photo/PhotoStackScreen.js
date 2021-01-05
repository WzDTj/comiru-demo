import React from 'react';
import PhotoScreen from './PhotoScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { defaultScreenOptions } from '../../constants/settings';

const PhotoStack = createStackNavigator();
const PhotoStackScreen = () => (
  <PhotoStack.Navigator screenOptions={defaultScreenOptions}>
    <PhotoStack.Screen name="Photo" component={PhotoScreen} />
  </PhotoStack.Navigator>
);

export default PhotoStackScreen;
