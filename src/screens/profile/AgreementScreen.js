import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Dimensions, SafeAreaView, View } from 'react-native';
import PDFView from 'react-native-pdf';
import { agreementPdfUrl } from '../../constants/settings';

const AgreementScreen = ({ navigation }) => {
  useLayoutEffect(() => navigation.setOptions({ title: 'Service Agreement' }), [navigation]);

  const [source] = useState({ uri: agreementPdfUrl, cache: true });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <PDFView source={source} style={styles.pdf} />
      </View>
    </SafeAreaView>
  );
};

export default AgreementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
