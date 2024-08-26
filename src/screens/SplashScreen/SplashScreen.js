import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  useColorScheme,
  View,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import Container from '../../components/Container/Container';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';
import {useNavigation} from '@react-navigation/native';
import Gambar from '../../components/Gambar/Gambar';
import Txt from '../../components/Txt/Txt';
import Contacts from 'react-native-contacts';
import authState from '../../state/auth';

const SplashScreen = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const navigation = useNavigation();
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
  const [isLoading, setIsLoading] = useState(true);

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
    const fetchRole = async () => {
      const storedRole = await EncryptedStorage.getItem('role_access');
      setRole(storedRole);
    };
    

    fetchRole();
  }, []);

  console.log('role: ', role);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        if (role) {
          role === 'user'
            ? navigation.navigate('homeUser')
            : navigation.navigate('homeAdmin');
        } else {
          navigation.navigate('login'); // Navigate to Login if role is null
        }
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, role]);

  return (
    <Container useView={true} translucent={true} backgroundColor="transparent">
      <View
        style={{
          backgroundColor: theme.subBackground,
          width: '100%',
          alignItems: 'center',
          flex: 1,
        }}>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center',
            flex: 1,
          }}>
          <Gambar
            sourceImage={require('../../assets/icons/Logo.png')}
            w={2}
            h={4}
            style={{alignSelf: 'center', justifyContent: 'center'}}
          />
        </View>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingHorizontal: '2%',
            paddingBottom: '10%',
          }}>
          <Txt
            fontSize={10}
            fontType="Regular"
            style={{
              textAlign: 'center',
              width: 'auto',
              color: theme.text,
            }}>
            PT Electronic Data Interchange Indonesia
          </Txt>
          <Txt
            fontSize={10}
            style={{
              textAlign: 'center',
              width: 'auto',
              color: theme.text,
            }}>
            Member of Pelindo
          </Txt>
        </View>
      </View>
    </Container>
  );
};

export default SplashScreen;
