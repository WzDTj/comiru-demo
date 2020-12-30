import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import KeyValueCell from './KeyValueCell';
import colors from '../constants/colors';

const KeyValueList = (props) => {
  const { data } = props;

  const keyExtrator = (item) => item.id;

  const renderItem = ({ item }) => <KeyValueCell {...item} />;

  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={data}
      keyExtrator={keyExtrator}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
};

export default KeyValueList;

const styles = StyleSheet.create({
  separator: {
    marginLeft: 15,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
});
