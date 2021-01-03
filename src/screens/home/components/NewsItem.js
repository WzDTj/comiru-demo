import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const NewsItem = (props) => {
  const { data } = props;
  const { source, title, date, cover } = data;

  const [avatar] = useState(data.avatar);
  const [avatarSize, setAvatarSize] = useState({ width: null, height: 16 });

  useLayoutEffect(() => {
    Image.getSize(avatar, (width, height) => {
      const avatarWidth = (width * 16) / height;
      setAvatarSize({ width: avatarWidth, height: 16 });
    });
  }, [avatar]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.sourceContainer}>
          <Image style={[styles.avatar, avatarSize]} source={{ uri: avatar }} resizeMode="contain" />
          <Text style={styles.source}>{source}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.coverContainer}>
        <Image style={styles.cover} source={{ uri: cover }} />
      </View>
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,

    backgroundColor: 'white',

    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  infoContainer: {
    flex: 1,
    flexDirection: 'column',
  },

  sourceContainer: {
    flexDirection: 'row',
    paddingBottom: 8,
    justifyContent: 'flex-start',
  },
  avatar: {
    marginRight: 8,
    resizeMode: 'contain',
  },
  source: {
    color: '#70757a',
    fontSize: 12,
    lineHeight: 16,
  },

  title: {
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 20,
  },

  date: {
    color: '#70757a',
    fontSize: 12,
    lineHeight: 16,
  },

  coverContainer: {
    marginLeft: 16,
    width: 92,
    height: 92,
  },
  cover: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 8,
  },
});
