import React, { useContext, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity } from 'react-native';
import { AppContext } from '../../contexts/AppContext';
import { defaultAvatar } from '../../assets';
import { KeyValueList } from '../../components';
import colors from '../../constants/colors';

const ProfileScreen = ({ navigation }) => {
  useLayoutEffect(() => navigation.setOptions({ headerShown: false }), [navigation]);

  const { dispatch } = useContext(AppContext);
  const data = [
    { id: '1', title: 'My Profile', value: null, isLink: true },
    { id: '2', title: 'Help & Feedback', value: null, isLink: true },
    { id: '3', title: 'Service Agreement', value: null, isLink: true, onPress: () => navigation.push('Agreement') },
    { id: '4', title: 'Settings', value: null, isLink: true },
  ];

  const onLogout = () => dispatch({ type: 'LOGOUT' });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.userContainer}>
          <Image style={styles.avatar} source={defaultAvatar} />
          <Text style={styles.nickname}>Comiru Cat</Text>
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
    resizeMode: 'contain',
  },
  nickname: {
    marginTop: 8,
    color: '#493b32',
    fontSize: 24,
    fontWeight: '500',
  },

  featureContainer: {
    margin: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },

  logoutButton: {
    marginVertical: 16,
    marginHorizontal: 16,
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
});
