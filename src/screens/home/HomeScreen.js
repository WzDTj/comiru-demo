import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TimeClock } from '../../components';

const HomeScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: '新闻',
      headerRight: ({ tintColor }) => (
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Scan')}>
          <MaterialCommunityIcons name="qrcode-scan" color={tintColor} size={22} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

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

const styles = StyleSheet.create({
  headerButton: {
    paddingRight: 15,
  },
});
export default HomeScreen;
