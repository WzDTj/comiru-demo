import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';

const KeyValueCell = (props) => {
  const { title, value, onPress, isLink } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {isLink ? <Icon style={styles.rightIcon} name="chevron-right" size={24} color={colors.text} /> : null}
    </TouchableOpacity>
  );
};

export default KeyValueCell;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  rightIcon: {
    marginLeft: 8,
  },

  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
  },
  value: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 24,
  },
});
