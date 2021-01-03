import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../constants/colors';

const GalleryItem = (props) => {
  const { style } = props;

  const [data] = useState(props.data);
  const [onToggle] = useState(() => props.onToggle);
  const [selected, setSelected] = useState(false);

  useEffect(() => onToggle({ selected, data }), [data, onToggle, selected]);

  return (
    <View style={style}>
      <Image style={styles.image} source={{ uri: data.uri }} />
      <TouchableOpacity style={styles.checkbox} onPress={() => setSelected(!selected)}>
        {selected ? (
          <Icon name="checkbox-marked-circle" size={28} color={colors.white} />
        ) : (
          <Icon name="checkbox-blank-circle-outline" size={28} color={colors.white} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GalleryItem;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  checkbox: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
});
