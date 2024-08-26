// App.js
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Routeing from './src/navigation/Router';
import {darkTheme} from './src/config/themes/Dark';
import {lightTheme} from './src/config/themes/Light';
import authState from './src/state/auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;
  const {
    token,
    setToken,
    userProfile,
    setuserProfile,
    setAvatar,
    Avatar,
    role,
    setRole,
  } = authState();

  useEffect(() => {
    const initApp = async () => {
      const storedToken = await EncryptedStorage.getItem('access_token');
      const storedRole = await EncryptedStorage.getItem('role_access');

      if (storedToken) {
        setToken(storedToken);
        setRole(storedRole);
      }

      const storedProfile = await AsyncStorage.getItem('profile');
      const userInfo = JSON.parse(storedProfile);
      if (storedProfile) {
        setuserProfile(userInfo);
      }
    };

    initApp();
  }, []);

  return (
    <>
      <Routeing />
    </>
  );
}

export default App;
