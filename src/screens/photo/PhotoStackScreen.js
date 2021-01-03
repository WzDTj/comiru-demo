import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PhotoScreen from './PhotoScreen';
import GallerySelectorScreen from './GallerySelectorScreen';
import colors from '../../constants/colors';

const PhotoStack = createStackNavigator();

const screenOptions = {
  headerTintColor: colors.text,
  headerStyle: { backgroundColor: colors.primary },
};

const PhotoStackScreen = () => {
  return (
    <PhotoStack.Navigator mode="modal" initalRouteName="Photos" screenOptions={screenOptions}>
      <PhotoStack.Screen name="Photos" component={PhotoScreen} />
      <PhotoStack.Screen name="GallerySelector" component={GallerySelectorScreen} />
    </PhotoStack.Navigator>
  );
};

export default PhotoStackScreen;
