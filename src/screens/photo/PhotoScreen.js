import React, { useLayoutEffect, useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../constants/colors';

const WINDOW_WIDTH = Dimensions.get('window').width;
const isLargeScreen = WINDOW_WIDTH >= 768;
const NUM_COLUMNS = isLargeScreen ? 6 : 4;
const IMAGE_WIDTH = (WINDOW_WIDTH - NUM_COLUMNS * 2 + 2) / NUM_COLUMNS;

const PhotoScreen = ({ route, navigation }) => {
  const [photos, setPhotos] = useState([]);

  useLayoutEffect(
    () =>
      navigation.setOptions({
        title: 'Photos',
        headerRight: () => (
          <TouchableOpacity
            style={styles.headerRightButton}
            onPress={() =>
              navigation.push('GallerySelector', {
                onCancel: () => console.log('cancel'),
                onConfirm: (data) => setPhotos([...photos, ...data]),
              })
            }
          >
            <Icon name="plus" size={30} color={colors.text} />
          </TouchableOpacity>
        ),
      }),
    [navigation, photos],
  );

  useEffect(() => {
    const loadAssets = async () => {
      await AsyncStorage.getItem('photos').then((data) => setPhotos(JSON.parse(data) ?? []));
    };

    loadAssets();
  }, []);

  // save photo info to local storage
  useEffect(() => {
    AsyncStorage.setItem('photos', JSON.stringify(photos));
  }, [photos]);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: item.uri }} />
    </View>
  );

  const keyExtractor = (asset) => asset.id;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.contentContainer}
        numColumns={NUM_COLUMNS}
        data={photos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    margin: -1,
    flex: 1,
  },
  imageContainer: {
    margin: 1,
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerRightButton: {
    marginRight: 16,
  },
});
