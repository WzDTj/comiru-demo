import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import colors from '../constants/colors';

const CountDown = (props) => {
  const { size = 100, strokeWidth = 10, initial, total, step, textStyle } = props;
  const [timer, setTimer] = useState(null);
  const [count, setCount] = useState(initial);
  const [interval] = useState(props.interval ?? 1000);

  const radius = (size - strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const percentage = (count / total) * 100;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  const start = useCallback(() => {
    setCount(count + step);
  }, [count, step]);

  useEffect(() => {
    setTimer(setInterval(start, interval));
  }, [start, interval]);

  useEffect(() => {
    if (count >= total) clearInterval(timer);
  }, [timer, count, total]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={viewBox}>
        <Circle
          style={styles.circleBackground}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#f2f2f2"
          strokeWidth={strokeWidth}
        />

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primary}
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
      </Svg>
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
    color: '#f2f2f2',
    fontSize: 16,
    fontWeight: '500',
  },
});
