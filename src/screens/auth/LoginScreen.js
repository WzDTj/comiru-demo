import React, { useState, useContext, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import { AppContext } from '../../contexts/AppContext';
import { useRequest } from '../../hooks';
import { logo } from '../../assets';

const LoginScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { request } = useRequest('http://hn.algolia.com/api/v1/search', {
    manual: true,
    params: { x: 'x' },
    onSuccess: (data) => console.log('success', data),
    onError: (error) => console.log('error', error),
  });

  const { dispatch } = useContext(AppContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeUsername = (text) => setUsername(text);

  const onChangePassword = (text) => setPassword(text);

  const onSubmit = () => {
    request();
    // dispatch({ type: 'LOGIN', payload: { username, password } });
  };

  return (
    <SafeAreaView style={styles.container}>
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

        <TouchableOpacity style={styles.loginButton} onPress={onSubmit}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fddc3e',
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
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  lastInput: {
    marginBottom: 0,
  },

  loginButton: {
    marginTop: 24,
    height: 50,

    backgroundColor: '#16bfb7',
    borderRadius: 25,

    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
