import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { CircleProgress, CountDown, TimeClock } from '../../components';
import colors from '../../constants/colors';

const ComponentScreen = ({ navigation }) => {
  useLayoutEffect(() => navigation.setOptions({ title: 'Components' }), [navigation]);
  const [percentage, setPercentage] = useState(0);

  const onCount = (initial, count) => setPercentage(((initial - count) / initial) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.componentContainer}>
          <TimeClock style={styles.timeClock} />
        </View>

        <View style={[styles.componentContainer, styles.row]}>
          <CircleProgress color={colors.primary} size={80} strokeWidth={10} percentage={25} />
          <CircleProgress color={colors.success} size={80} strokeWidth={10} percentage={50} />
          <CircleProgress color={colors.danger} size={80} strokeWidth={10} percentage={75} />
        </View>

        <View style={[styles.componentContainer, styles.row]}>
          <CircleProgress color={colors.success} size={80} strokeWidth={10} percentage={percentage} />
          <CountDown textStyle={styles.countDown} initial={10} onCount={onCount} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ComponentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  componentContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  timeClock: {
    color: colors.text,
    fontSize: 40,
  },

  countDown: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
