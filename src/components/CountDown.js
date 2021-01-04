import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../constants/colors';

const CountDown = (props) => {
  const { initial, step = 1, style = {}, textStyle = {} } = props;
  const [timer, setTimer] = useState(null);
  const [count, setCount] = useState(initial);
  const [onCount] = useState(() => props.onCount);

  const start = useCallback(() => {
    setCount(count - step);
  }, [count, step]);

  useEffect(() => {
    setTimer(setInterval(start, 1000));
  }, [start]);

  useEffect(() => {
    if (count === 0) clearInterval(timer);
  }, [timer, count]);

  useEffect(() => {
    onCount(initial, count);
  }, [onCount, initial, count]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, textStyle]}>{count}</Text>
    </View>
  );
};

export default CountDown;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
});
