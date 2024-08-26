import React, {useEffect, useState} from 'react';
import {TouchableOpacity, useColorScheme, View} from 'react-native';
import Container from '../../components/Container/Container';
import LinearGradient from 'react-native-linear-gradient';
import Gambar from '../../components/Gambar/Gambar';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';
import Txt from '../../components/Txt/Txt';
import InputText from '../../components/InputText/InputText';
import BTN from '../../components/BTN/BTN';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FecthAPIService from '../../services/API/FecthAPIService';
import {API_BASE_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import authState from '../../state/auth';
import FailToast from '../../components/FailToast/FailToast';
import SuccessToast from '../../components/SuccessToast/SuccessToast';
import Toast from 'react-native-root-toast';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

const Login = () => {
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
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const [showPaswword, setShowPassword] = useState(false);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Masukkan email yang valid')
      .required('Email diperlukan'),
    password: Yup.string()
      .min(6, 'Password harus memiliki minimal 6 karakter')
      .required('Password diperlukan'),
  });

  useEffect(() => {
    // Fungsi untuk memuat token yang tersimpan
    const loadStoredTokens = async () => {
      try {
        const accessToken = await EncryptedStorage.getItem('access_token');
        const role = await EncryptedStorage.getItem('role_access');

        if (accessToken && role) {
          setRole(role);
          setToken(accessToken);
        }
      } catch (error) {
        console.error('Error saat memuat token dari penyimpanan:', error);
      }
    };

    loadStoredTokens();
  }, [setRole, setToken, navigation]);

  const handleLogin = async (values, {setSubmitting}) => {
    try {
      const response = await FecthAPIService({
        url: `${API_BASE_URL}/login`,
        metode: 'POST',
        body: {
          email: values.email,
          password: values.password,
        },
      });
      // const result = await response.json();
      // Handle response
      if (response.token) {
        await EncryptedStorage.setItem('access_token', response?.token);
        await EncryptedStorage.setItem('role_access', response?.role);
        const savedRole = await EncryptedStorage.getItem('role_access');
        const savedToken = await EncryptedStorage.getItem('access_token');

        // console.log(response);
        setRole(savedRole);
        setToken(savedToken);
        const Success = SuccessToast({
          title:
            response.role === 'user'
              ? `Login Berhasil`
              : `Login anda sebagai admin berhasil`,
          duration: Toast.durations.LONG,
        });
        Success.showToast();
        if (response.role === 'user') {
          await fetchProfileData(savedToken); // Memanggil fungsi pengambilan data profil

          navigation.navigate('homeUser'); // Navigasi ke halaman user
        } else {
          navigation.navigate('homeAdmin'); // Navigasi ke halaman admin jika role bukan 'user'
        }
      } else {
        const Gagal = FailToast({
          title: 'Login Tidak Berhasil',
          message: response.message,
          duration: Toast.durations.LONG,
        });
        Gagal.showToast();
      }
    } catch (error) {
      const Gagal = FailToast({
        title: 'Login Tidak Berhasil',
        message: error,
        duration: Toast.durations.LONG,
      });
      Gagal.showToast();
      console.error('Login Error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const fetchProfileData = async token => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      const response = await axios.get(`${API_BASE_URL}/profile`, {headers});
      // setuserProfile(response.data);
      if (response.status === 200) {
        const userInfoString = JSON.stringify(response.data); // Make sure to serialize only the data part if it's an object
        await AsyncStorage.setItem('profile', userInfoString);
        const userInfoStringRetrieved = await AsyncStorage.getItem('profile');
        const userInfo = JSON.parse(userInfoStringRetrieved);
        console.log(userInfo);
        setuserProfile(userInfo);
      }
      console.log('Profile fetched:', response.data);
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      resetScrollToCoords={{x: 0, y: 0}}
      contentContainerStyle={{flexGrow: 1}}
      scrollEnabled={true} // you can experiment with this option - it's optional
    >
      <Container
        useView={true}
        translucent={true}
        backgroundColor="transparent">
        <LinearGradient
          colors={['#49B4F8', '#0375BC']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            width: '100%',
            alignItems: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Gambar
              sourceImage={require('../../assets/backgrounds/bg.png')}
              w={1}
              h={3}
              style={{alignSelf: 'center', justifyContent: 'center'}}
            />
          </View>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View
                style={{
                  backgroundColor: theme.subBackground,
                  width: '80%',
                  height: 'auto',
                  paddingHorizontal: '2%',
                  paddingVertical: '2%',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    height: 'auto',
                  }}>
                  <Gambar
                    sourceImage={require('../../assets/icons/Logo.png')}
                    w={1}
                    h={1.8}
                    style={{alignSelf: 'center', justifyContent: 'center'}}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '-15%',
                  }}>
                  <Txt
                    fontSize={14}
                    fontType="Bold"
                    style={{
                      textAlign: 'center',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    Login
                  </Txt>

                  <View
                    style={{
                      width: '90%',
                      alignItems: 'center',
                      paddingTop: '1%',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        alignSelf: 'flex-start',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingHorizontal: '3%',
                        paddingVertical: '3%',
                      }}>
                      <Txt
                        fontSize={11}
                        style={{
                          textAlign: 'left',
                          width: 'auto',
                          color: theme.text,
                        }}>
                        Email
                      </Txt>
                    </View>
                    <InputText
                      color={theme.text}
                      placeholder={'Masukkan Email'}
                      placeholderTextColor={theme.text}
                      keyboardType="email-address"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <Txt fontSize={10} style={{color: 'red'}}>
                        {errors.email}
                      </Txt>
                    )}
                  </View>
                  <View
                    style={{
                      width: '90%',
                      alignItems: 'center',
                      paddingTop: '3%',
                    }}>
                    <View
                      style={{
                        width: '100%',
                        alignSelf: 'flex-start',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingHorizontal: '3%',
                        paddingVertical: '3%',
                      }}>
                      <Txt
                        fontSize={11}
                        style={{
                          textAlign: 'left',
                          width: 'auto',
                          color: theme.text,
                        }}>
                        Password
                      </Txt>
                    </View>
                    <InputText
                      placeholder={'Password'}
                      placeholderTextColor={theme.text}
                      keyboardType="default"
                      secureTextEntry={showPaswword ? false : true}
                      color={theme.text}
                      clearOnchange={true}
                      clearInput={() => setShowPassword(!showPaswword)}
                      iconRight={
                        showPaswword
                          ? require('../../assets/images/unvisible.png')
                          : require('../../assets/images/visible.png')
                      }
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <Txt fontSize={10} style={{color: 'red'}}>
                        {errors.password}
                      </Txt>
                    )}
                  </View>

                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: '3%',
                    }}>
                    <BTN
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                      style={{
                        width: '90%',
                        backgroundColor: '#1C8DDF',
                        paddingVertical: '5%',
                        opacity: 0.9,
                      }}>
                      <Txt
                        fontSize={12}
                        fontType="Bold"
                        style={{
                          textAlign: 'left',
                          width: 'auto',
                          color: '#FFFF',
                        }}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                      </Txt>
                    </BTN>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      paddingTop: '5%',
                      alignItems: 'flex-end',
                      alignSelf: 'flex-end',
                      paddingHorizontal: '6%',
                      paddingBottom: '3%',
                    }}>
                    <Txt
                      fontSize={10}
                      style={{
                        textAlign: 'left',
                        width: 'auto',
                        color: theme.text,
                      }}>
                      Belum punya akun ?
                    </Txt>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('register')}>
                      <Txt
                        fontSize={10}
                        fontType="SemiBold"
                        style={{
                          textAlign: 'left',
                          width: 'auto',
                          color: '#49B4F8',
                        }}>
                        {'  '}Daftar
                      </Txt>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </Formik>
        </LinearGradient>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default Login;
