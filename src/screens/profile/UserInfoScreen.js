// TODO: add loading <04-01-21, Dantong Jin> //
import React, { useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Linking, Text, TouchableOpacity } from 'react-native';
import { KeyValueList } from '../../components';
import colors from '../../constants/colors';
import { useUser } from '../../hooks';

const UserInfoScreen = ({ navigation }) => {
  useLayoutEffect(() => navigation.setOptions({ title: 'My Profile' }), [navigation]);
  const { user, update } = useUser();

  const data = [
    { id: '1', title: 'Nickname', value: user?.nickname, isLink: true },
    {
      id: '2',
      title: 'Mail',
      value: user?.mail,
      isLink: true,
      onPress: (payload) => Linking.openURL(`mailto:${payload.value}`),
    },
    {
      id: '4',
      title: 'Tel',
      value: user?.tel,
      isLink: true,
      onPress: (payload) => Linking.openURL(`tel:${payload.value}`),
    },
    {
      id: '3',
      title: 'Website',
      value: user?.website,
      isLink: true,
      onPress: (payload) => Linking.openURL(payload.value),
    },
  ];

  const onUpdateAvatar = () => {
    navigation.navigate('GallerySelector', {
      allowMultiple: false,
      onConfirm: (payload) => {
        const { uri } = payload[0];
        update({ avatar: { uri } });
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={user?.avatar} />
          <TouchableOpacity style={styles.updateButton} onPress={onUpdateAvatar}>
            <Text style={styles.updateButtonText}>UPDATE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <KeyValueList data={data} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  avatarContainer: {
    margin: 16,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  avatar: {
    marginBottom: 8,
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.primary,
  },

  updateButton: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  updateButtonText: {
    color: colors.white,
    fontSize: 14,
  },

  infoContainer: {
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});
