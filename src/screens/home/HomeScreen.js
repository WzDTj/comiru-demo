import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import { useRequest } from '../../hooks';
import { TimeClock } from '../../components';
import { NewsItem } from './components';
import colors from '../../constants/colors';
import apis from '../../constants/apis';
import { fakeNews } from '../../mocks/fakeData';

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => navigation.setOptions({ title: 'News' }), [navigation]);

  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => <NewsItem data={item} />;

  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  const ListFooterComponent = () => <View style={styles.listFooter} />;

  const { request: fetchNews } = useRequest(apis.FETCH_NEWS, {
    manual: true,
    mock: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ data: fakeNews });
        }, 1000);
      });
    },
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews()
      .then(({ data }) => setNews(data))
      .finally(() => setRefreshing(false));
  }, [fetchNews]);

  const onEndReached = useCallback(
    () => fetchNews().then(({ data }) => setNews((oldValue) => [...oldValue, ...data])),
    [fetchNews],
  );

  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

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
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
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
