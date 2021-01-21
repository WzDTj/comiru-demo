// TODO: only use react native camera <02-01-21, Dantong Jin> //
// TODO: remove react-native-qrcode-scanner <02-01-21, Dantong Jin> //
// TODO: remove react-native-premissions <02-01-21, Dantong Jin> //
// TODO: add loading when scanned qrcode <02-01-21, Dantong Jin> //
import React, { useLayoutEffect, useContext } from 'react';
import { StyleSheet, StatusBar, View, Text, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../constants/colors';

import { AppContext } from '../../contexts/AppContext';
import { useRequest } from '../../hooks';
import apis from '../../constants/apis';

const ScanScreen = ({ navigation }) => {
  useLayoutEffect(
    () =>
      navigation.setOptions({
        title: null,
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Icon name="close" size={30} color="white" />
          </TouchableOpacity>
        ),
      }),
    [navigation],
  );

  const { dispatch } = useContext(AppContext);

  const { request } = useRequest(apis.LOGIN, {
    manual: true,
    mock: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ token: 'dummy-token' });
        }, 1000);
      });
    },
    onSuccess: (data) => {
      const { token } = data;
      dispatch({ type: 'LOGIN', payload: { token } });
      navigation.goBack();
    },
    onError: (error) => console.warn('error', error),
  });

  const onScanned = (text) => request();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" animated={true} />
      <QRCodeScanner
        cameraStyle={styles.scanner}
        showMarker={true}
        customMarker={
          <View style={styles.maskContainer}>
            <View style={styles.maskItem} />
            <View style={styles.maskCenterRowContainer}>
              <View style={styles.maskItem} />
              <View style={styles.mask} />
              <View style={styles.maskItem} />
            </View>
            <View style={styles.maskItem} />
          </View>
        }
        onRead={onScanned}
      />

      <View style={styles.hintTextContainer}>
        <Text style={styles.hintText}>Go to on your computer and scan the QR code.</Text>
      </View>
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scanner: {
    width: '100%',
    height: '100%',
  },

  hintTextContainer: {
    padding: 60,
    backgroundColor: '#fff',
  },
  hintText: {
    color: colors.text,
    fontSize: 18,
    textAlign: 'center',
  },

  maskContainer: {
    width: '100%',
    height: '100%',

    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  maskItem: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  maskCenterRowContainer: {
    flex: 0,
    height: 250,

    flexDirection: 'row',
  },
  mask: {
    width: 250,
    height: 250,
    backgroundColor: 'transparent',
  },
});
