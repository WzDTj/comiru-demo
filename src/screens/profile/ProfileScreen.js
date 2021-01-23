import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text } from 'react-native';
import { AppContext } from '../../contexts/AppContext';
import { BaseButton, KeyValueList } from '../../components';
import { useUser } from '../../hooks';
import { WINDOW_WIDTH, IS_LARGE_SCREEN } from '../../constants/device';
import colors from '../../constants/colors';

const ProfileScreen = ({ navigation }) => {
  useLayoutEffect(() => navigation.setOptions({ headerShown: false }), [navigation]);

  // fetch user after mounted
  useEffect(() => {
    fetch();
  }, [fetch]);

  const {
    state: { user },
    dispatch,
  } = useContext(AppContext);

  const { fetch } = useUser();

  const userFeatures = [
    { id: '1', title: 'My Profile', value: null, isLink: true, onPress: () => navigation.push('UserInfo') },
    { id: '2', title: 'Service Agreement', value: null, isLink: true, onPress: () => navigation.push('Agreement') },
  ];

  const onLogout = () => dispatch({ type: 'LOGOUT' });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.userContainer}>
          <Image style={styles.avatar} source={user?.avatar} />
          <Text style={styles.nickname}>{user?.nickname}</Text>
        </View>

        <View style={styles.featureContainer}>
          <KeyValueList data={userFeatures} />
        </View>

        <BaseButton
          style={styles.logoutButton}
          textStyle={styles.logoutButtonText}
          text="LOGOUT"
          type="primary"
          onPress={onLogout}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const FEATURE_CONTAINER_WIDTH = IS_LARGE_SCREEN ? WINDOW_WIDTH / 2 : WINDOW_WIDTH - 32;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fddc3e',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },

  userContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#fddc3e',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  nickname: {
    marginTop: 8,
    color: '#493b32',
    fontSize: 24,
    fontWeight: '500',
  },

  featureContainer: {
    flex: 0,
    width: FEATURE_CONTAINER_WIDTH,
    marginTop: 32,
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  logoutButton: {
    width: FEATURE_CONTAINER_WIDTH,
    marginVertical: 32,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
