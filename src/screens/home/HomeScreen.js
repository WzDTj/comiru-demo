// TODO: use request hook <04-01-21, Dantong Jin> //
// TODO: use loading <04-01-21, Dantong Jin> //
// TODO: create news list <04-01-21, Dantong Jin> //
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import { TimeClock } from '../../components';
import { NewsItem } from './components';
import colors from '../../constants/colors';
import { fakeNews } from '../../mocks/fakeData';

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => navigation.setOptions({ title: 'News' }), [navigation]);

  const [news] = useState(fakeNews);

  const keyExtractor = (item) => item.id;

  const renderItem = ({ item }) => <NewsItem data={item} />;

  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  const ListFooterComponent = () => <View style={styles.listFooter} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.timeClockContainer}>
          <TimeClock style={styles.timeClock} />
        </View>
        <FlatList
          style={styles.newsContainer}
          data={news}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListFooterComponent={ListFooterComponent}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  timeClockContainer: {
    margin: 16,
    padding: 16,

    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 8,
    backgroundColor: '#fff',
  },

  timeClock: {
    color: colors.text,
    fontSize: 40,
  },

  newsContainer: {
    paddingHorizontal: 16,
  },

  listFooter: {
    height: 16,
  },

  separator: {
    height: 8,
  },
});
