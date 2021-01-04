import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';
import { AppContext } from '../../contexts/AppContext';
import { KeyValueList } from '../../components';
import { useUser } from '../../hooks';
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

  const data = [
    { id: '1', title: 'My Profile', value: null, isLink: true, onPress: () => navigation.push('UserInfo') },
    { id: '2', title: 'Help & Feedback', value: null, isLink: true },
    { id: '3', title: 'Service Agreement', value: null, isLink: true, onPress: () => navigation.push('Agreement') },
    { id: '4', title: 'Settings', value: null, isLink: true },
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
          <KeyValueList data={data} />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fddc3e',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },

  userContainer: {
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
    margin: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },

  logoutButton: {
    marginVertical: 16,
    marginHorizontal: 16,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
});
