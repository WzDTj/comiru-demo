import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PhotoScreen from './PhotoScreen';
import { defaultScreenOptions } from '../../constants/settings';

const PhotoStack = createStackNavigator();

const PhotoStackScreen = () => {
  return (
    <PhotoStack.Navigator initalRouteName="Photos" screenOptions={defaultScreenOptions}>
      <PhotoStack.Screen name="Photos" component={PhotoScreen} />
    </PhotoStack.Navigator>
  );
};

export default PhotoStackScreen;
