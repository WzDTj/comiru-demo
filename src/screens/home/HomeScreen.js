import React, { useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { TimeClock } from '../../components';
import colors from '../../constants/colors';

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => navigation.setOptions({ title: 'News' }), [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={[styles.sectionContainer, styles.firstSectionContainer]}>
          <TimeClock style={styles.timeClock} />
        </View>
        <View style={styles.sectionContainer}>
          <Text>News List</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    padding: 16,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8,
    backgroundColor: '#fff',
  },
  firstSectionContainer: {
    marginTop: 16,
  },

  timeClock: {
    color: colors.text,
    fontSize: 40,
  },
});
