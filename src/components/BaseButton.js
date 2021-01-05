import React from 'react';
import { StyleSheet, ActivityIndicator, Pressable, Text } from 'react-native';
import colors from '../constants/colors';

const getButtonStyles = (type) => {
  switch (type) {
    case 'primary':
      return { backgroundColor: colors.primary };
    default:
      return {};
  }
};

const getButtonTextStyles = (type, textColor) => {
  switch (type) {
    case 'primary':
      return { color: textColor };
    default:
      return {};
  }
};

const BaseButton = (props) => {
  const { text, textColor = colors.text, type, disabled = false, loading, onPress } = props;

  const buttonStyles = getButtonStyles(type);

  const buttonTextStyles = getButtonTextStyles(type, textColor);

  const containerStyles = ({ pressed }) => {
    return [
      styles.container,
      buttonStyles,
      props.style,
      pressed ? styles.pressed : {},
      disabled ? styles.disabled : {},
    ];
  };

  const textStyles = [styles.text, buttonTextStyles, props.textStyle];

  return (
    <Pressable style={containerStyles} disabled={disabled} onPress={onPress}>
      {loading ? <ActivityIndicator size="small" color={textColor} /> : <Text style={textStyles}>{text}</Text>}
    </Pressable>
  );
};

export default BaseButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,

    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
  },

  text: {},
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
});
