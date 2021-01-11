import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, FlatList, Text, Alert, TouchableOpacity, LogBox } from 'react-native';
import { GalleryItem } from './components';
import * as MediaLibrary from 'expo-media-library';
import colors from '../../constants/colors';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const GallerySelectorScreen = ({ route, navigation }) => {
  useLayoutEffect(
    () =>
      navigation.setOptions({
        title: 'Gallery Selector',
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

  const [allowMultiple] = useState(route.params?.allowMultiple ?? true);
  const [photos, setPhotos] = useState([]);
  const [endCursor, setEndCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true);
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
    ({ selected, data }) => (selected ? appendToSelectedPhotos(data) : removeFromSelectedPhotos(data)),
    [appendToSelectedPhotos, removeFromSelectedPhotos],
  );

  const appendToSelectedPhotos = useCallback((data) => setSelectedPhotos((oldValue) => [...oldValue, data]), []);

  const removeFromSelectedPhotos = useCallback(
    (data) => setSelectedPhotos((oldValue) => oldValue.filter((item) => item.id !== data.id)),
    [],
  );

  const renderItem = ({ item }) => <GalleryItem style={styles.galleryItem} data={item} onToggle={onToggle} />;

  const keyExtractor = (asset) => asset.id;

  const onEndReached = (info) => {
    if (hasNextPage) fetchAssets({ after: endCursor });
  };

  const requestPermissions = useCallback(async () => {
    await MediaLibrary.requestPermissionsAsync()
      .then(({ status }) => (status === 'granted' ? Promise.resolve() : Promise.reject()))
      .catch(() => {
        const cancelButton = {
          text: 'OK',
          onPress: () => navigation.goBack(),
          style: 'cancel',
        };

        Alert.alert('Sorry, we need camera roll permissions to make this work!', null, [cancelButton]);
      });
  }, [navigation]);

  const fetchAssets = useCallback(async (params) => {
    MediaLibrary.getAssetsAsync(params)
      .then(({ assets, endCursor, hasNextPage }) => {
        setPhotos((oldValue) => oldValue.concat(assets));
        setEndCursor(endCursor);
        setHasNextPage(hasNextPage);
      })
      .catch((error) => console.warn(error));
  }, []);

  useEffect(() => {
    requestPermissions().then(() => fetchAssets());
  }, [requestPermissions, fetchAssets]);

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
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
};

export default GallerySelectorScreen;

const IMAGE_WIDTH = (Dimensions.get('window').width + 2) / 3;

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
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
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
