// TODO: login button: loading, disabled <31-12-20, Dantong Jin> //
import React, { useState, useContext, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Image, TextInput, Text, TouchableOpacity, StatusBar } from 'react-native';
import { AppContext } from '../../contexts/AppContext';
import { useRequest } from '../../hooks';
import { logo } from '../../assets';
import apis from '../../constants/apis';
import colors from '../../constants/colors';

const LoginScreen = ({ navigation }) => {
  useLayoutEffect(() => navigation.setOptions({ headerShown: false }), [navigation]);

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

  const onScan = () => navigation.push('Scan');

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
          <TouchableOpacity style={styles.loginButton} onPress={onLogin} disabled={false} activeOpacity={0.8}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={onScan} disabled={false} activeOpacity={0.8}>
            <Text style={styles.loginButtonText}>QRCODE LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: '33.33%',
    paddingHorizontal: 50,
    flexDirection: 'column',
    justifyContent: 'center',
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
    paddingHorizontal: 25,
    height: 50,
    borderRadius: 25,
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
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,

    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
