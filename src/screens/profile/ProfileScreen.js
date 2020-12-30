import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AppContext } from '../../contexts/AppContext';

const ProfileScreen = () => {
  const { dispatch } = useContext(AppContext);
  return (
    <View>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={() => dispatch({ type: 'LOGOUT' })} />
    </View>
  );
};

export default ProfileScreen;
