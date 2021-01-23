import React, { useMemo, useState, useContext, useLayoutEffect } from 'react';
import { Dimensions, StyleSheet, SafeAreaView, View, Image, TextInput, StatusBar } from 'react-native';
import { BaseButton } from '../../components';
import { AppContext } from '../../contexts/AppContext';
import { useRequest } from '../../hooks';
import { logo } from '../../assets';
import apis from '../../constants/apis';
import colors from '../../constants/colors';

const LoginScreen = ({ navigation }) => {
  useLayoutEffect(() => navigation.setOptions({ headerShown: false }), [navigation]);

  const { dispatch } = useContext(AppContext);

  const { loading, request } = useRequest(apis.LOGIN, {
    manual: true,
    mock: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ token: 'dummy-token' });
        }, 1000);
      });
    },
    onSuccess: (data) => {
      console.log('success', data);
      const { token } = data;
      dispatch({ type: 'LOGIN', payload: { token } });
    },
    onError: (error) => console.log('error', error),
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = (text) => setUsername(text);

  const onChangePassword = (text) => setPassword(text);

  const onLogin = () => {
    request();
  };

  const onGoToScan = () => navigation.push('Scan');

  const canLogin = useMemo(() => {
    return !loading && username && password;
  }, [loading, username, password]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={logo} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="USERNAME"
            clearButtonMode="while-editing"
            returnKeyType="done"
            textContentType="username"
            onChangeText={onChangeUsername}
            value={username}
          />
          <TextInput
            style={[styles.input, styles.lastInput]}
            placeholder="PASSWORD"
            clearButtonMode="while-editing"
            secureTextEntry
            returnKeyType="done"
            textContentType="password"
            onChangeText={onChangePassword}
            value={password}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <BaseButton
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
            type="primary"
            text="LOGIN"
            disabled={!canLogin}
            loading={loading}
            onPress={onLogin}
          />
          <BaseButton
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
            type="primary"
            text="SCAN QR CODE"
            onPress={onGoToScan}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const WINDOW_WIDTH = Dimensions.get('window').width;
const isLargeScreen = WINDOW_WIDTH >= 768;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  contentContainer: {
    width: isLargeScreen ? WINDOW_WIDTH / 2 : WINDOW_WIDTH - 96,
    paddingTop: '33.33%',
  },

  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    resizeMode: 'contain',
  },

  inputContainer: {
    marginTop: 32,
    flexDirection: 'column',
  },
  input: {
    marginBottom: 8,
    paddingHorizontal: 24,
    height: 48,
    borderRadius: 24,
    borderColor: colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
  },
  lastInput: {
    marginBottom: 0,
  },

  buttonsContainer: {
    marginTop: 32,
  },
  loginButton: {
    marginBottom: 8,
    height: 48,
    borderRadius: 24,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
