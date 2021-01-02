import React, { useLayoutEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { TimeClock } from '../../components';

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => navigation.setOptions({ title: 'News' }), [navigation]);

  return (
    <SafeAreaView>
      <View>
        <TimeClock />
      </View>
      <View>
        <Text>News List</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
