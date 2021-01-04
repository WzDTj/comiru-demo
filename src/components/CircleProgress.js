import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import colors from '../constants/colors';

const CircleProgress = (props) => {
  const { size = 100, strokeWidth = 10, percentage = 0, inactiveColor = '#f2f2f2', color = colors.primary } = props;

  const radius = (size - strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={viewBox}>
        <Circle
          style={styles.circleBackground}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={inactiveColor}
          strokeWidth={strokeWidth}
        />

        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
      </Svg>
    </View>
  );
};

export default CircleProgress;

const styles = StyleSheet.create({
  container: {},
});
