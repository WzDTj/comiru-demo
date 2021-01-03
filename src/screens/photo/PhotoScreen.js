import React, { useLayoutEffect, useEffect, useState } from 'react';
import { FlatList, Dimensions, StyleSheet, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../constants/colors';

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
        numColumns={3}
        data={photos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

export default PhotoScreen;

const imageWidth = (Dimensions.get('window').width + 2) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    margin: -1,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    padding: 1,
    width: imageWidth,
    height: imageWidth,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerRightButton: {
    marginRight: 16,
  },
});
