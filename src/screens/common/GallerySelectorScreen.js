// TODO: switch albums <03-01-21, Dantong Jin> //
// TODO: selection order <03-01-21, Dantong Jin> //
// TODO: pull to load <03-01-21, Dantong Jin> //
import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, FlatList, Text, Alert, TouchableOpacity } from 'react-native';
import { GalleryItem } from './components';
import * as MediaLibrary from 'expo-media-library';
import colors from '../../constants/colors';

const GallerySelectorScreen = ({ route, navigation }) => {
  const [allowMultiple] = useState(route.params?.allowMultiple ?? true);
  const [photos, setPhotos] = useState([]);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const onCancel = useCallback(() => {
    const { onCancel: cancelHandler } = route.params ?? {};

    if (cancelHandler) cancelHandler();

    navigation.goBack();
  }, [route, navigation]);

  const onConfirm = useCallback(() => {
    const { onConfirm: confirmHandler } = route.params ?? {};

    if (confirmHandler) confirmHandler(selectedPhotos);

    navigation.goBack();
  }, [route, navigation, selectedPhotos]);

  const onToggle = useCallback(
    (payload) => {
      const { selected, data } = payload;
      selected ? appendToSelectedPhotos(data) : removeFromSelectedPhotos(data);
    },
    [appendToSelectedPhotos, removeFromSelectedPhotos],
  );

  const appendToSelectedPhotos = useCallback((data) => setSelectedPhotos((oldValue) => [...oldValue, data]), []);

  const removeFromSelectedPhotos = useCallback(
    (data) => setSelectedPhotos((oldValue) => oldValue.filter((item) => item.id !== data.id)),
    [],
  );

  const renderItem = ({ item }) => <GalleryItem style={styles.galleryItem} data={item} onToggle={onToggle} />;

  const keyExtractor = (asset) => asset.id;

  useLayoutEffect(
    () =>
      navigation.setOptions({
        title: null,
        headerLeft: () => (
          <TouchableOpacity style={styles.headerButton} onPress={onCancel}>
            <Text style={styles.headerButtonText}>Cancel</Text>
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity style={styles.headerButton} onPress={onConfirm}>
            <Text style={styles.headerButtonText}>Confirm</Text>
          </TouchableOpacity>
        ),
      }),
    [onCancel, onConfirm, navigation],
  );

  const getAssets = useCallback(async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!', null, [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        },
      ]);
    }
    MediaLibrary.getAssetsAsync()
      .then((result) => setPhotos(result.assets))
      .catch((error) => console.warn(error));
  }, [navigation]);

  useEffect(() => {
    getAssets();
  }, [getAssets]);

  useEffect(() => {
    if (!allowMultiple && selectedPhotos.length === 1) onConfirm();
  }, [selectedPhotos, allowMultiple, onConfirm]);

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

export default GallerySelectorScreen;

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
  galleryItem: {
    padding: 1,
    width: imageWidth,
    height: imageWidth,
  },
  headerButton: {
    marginHorizontal: 16,
  },
  headerButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
});
