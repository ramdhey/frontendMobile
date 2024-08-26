import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  useColorScheme,
  View,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import axios from 'axios';
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
// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid, Platform} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';

import ImageCropPicker from 'react-native-image-crop-picker';

const Register = () => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [photo, setPhoto] = useState(null);
  const [showPaswword, setShowPassword] = useState(false);

  const registerValidationSchema = Yup.object().shape({
    fullName: Yup.string().required('Nama lengkap diperlukan'),
    email: Yup.string()
      .email('Masukkan email yang valid')
      .required('Email diperlukan'),
    password: Yup.string()
      .min(6, 'Password harus memiliki minimal 6 karakter')
      .required('Password diperlukan'),
  });

  useEffect(() => {
    // Request permissions when the component is mounted
    if (Platform.OS === 'android') {
      requestCameraPermission();
      requestPhotoLibraryPermission();
    }
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Izin Kamera Diperlukan',
          message: 'Aplikasi ini membutuhkan akses ke kamera Anda',
          buttonNeutral: 'Tanya Nanti',
          buttonNegative: 'Batal',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Kamera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestPhotoLibraryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Izin Penyimpanan Diperlukan',
          message: 'Aplikasi ini membutuhkan akses ke penyimpanan Anda',
          buttonNeutral: 'Tanya Nanti',
          buttonNegative: 'Batal',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Penyimpanan permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleChoosePhoto = () => {
    Alert.alert(
      'Pilih Gambar',
      'Ambil foto atau pilih dari galeri',
      [
        {
          text: 'Kamera',
          onPress: () => {
            launchCamera(
              {
                mediaType: 'photo',
                includeBase64: false,
              },
              response => {
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.errorCode) {
                  console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                  handleCropImage(response.assets[0].uri);
                }
              },
            );
          },
        },
        {
          text: 'Galeri',
          onPress: () => {
            launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: false,
              },
              response => {
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.errorCode) {
                  console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                  handleCropImage(response.assets[0].uri);
                }
              },
            );
          },
        },
        {
          text: 'Batal',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const handleCropImage = imageUri => {
    ImageCropPicker.openCropper({
      path: imageUri,
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        setPhoto(image);
      })
      .catch(error => {
        console.log('Crop Error: ', error);
      });
  };

  const handleRegister = async (values, {setSubmitting}) => {
    const formData = new FormData();
    formData.append('fullName', values.fullName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    if (photo) {
      formData.append('photo', {
        uri: photo.path,
        type: photo.mime,
        name: photo.path.split('/').pop(),
      });
    }

    try {
      const response = await axios({
        url: `${API_BASE_URL}/register/user`,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });

      console.log(response.data);
      if (response.status === 201) {
        // Navigate on successful registration
        navigation.navigate('registrasiBerhasil');
      } else {
        // Handle cases where the server might respond with an error status
        throw new Error('Failed to register');
      }
    } catch (error) {
      console.error(
        'Register Error:',
        error.response ? error.response.data : error,
      );
      Alert.alert(
        'Error',
        'Registration failed: ' +
          (error.response ? error.response.data : error),
      );
    } finally {
      setSubmitting(false);
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
            flex: 1,
            justifyContent: 'center',
          }}>
          <Formik
            initialValues={{fullName: '', email: '', password: ''}}
            validationSchema={registerValidationSchema}
            onSubmit={handleRegister}>
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
                  marginTop: '10%',
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
                    Register
                  </Txt>

                  <TouchableOpacity onPress={handleChoosePhoto}>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: '3%',
                      }}>
                      {photo ? (
                        <View
                          style={{
                            width: imageWidth * 0.28,
                            height: imageHeight,
                            borderRadius: 50,
                            backgroundColor: theme.text,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                          }}>
                          <Gambar
                            sourceImage={{uri: photo.path}}
                            w={1}
                            h={1}
                            style={{
                              alignSelf: 'center',
                              justifyContent: 'center',
                            }}
                          />
                        </View>
                      ) : (
                        <View
                          style={{
                            width: imageWidth * 0.28,
                            height: imageHeight,
                            borderRadius: 50,
                            backgroundColor: theme.text,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Gambar
                            sourceImage={require('../../assets/images/camera.png')}
                            w={1}
                            h={0.6}
                            style={{
                              alignSelf: 'center',
                              justifyContent: 'center',
                            }}
                          />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                  <Txt
                    fontSize={9}
                    style={{
                      textAlign: 'center',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    Photo Profile
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
                        Nama Lengkap
                      </Txt>
                    </View>
                    <InputText
                      color={theme.text}
                      placeholder={'Masukkan Nama Lengkap'}
                      placeholderTextColor={theme.text}
                      keyboardType="default"
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      value={values.fullName}
                    />
                    {errors.fullName && touched.fullName && (
                      <Txt fontSize={8} style={{color: 'red'}}>
                        {errors.fullName}
                      </Txt>
                    )}
                  </View>

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
                      <Txt fontSize={8} style={{color: 'red'}}>
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
                      <Txt fontSize={8} style={{color: 'red'}}>
                        {errors.password}
                      </Txt>
                    )}
                  </View>

                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: '5%',
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
                        {isSubmitting ? 'Register...' : 'Register'}
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
                      Sudah punya akun ?
                    </Txt>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('login')}>
                      <Txt
                        fontSize={10}
                        fontType="SemiBold"
                        style={{
                          textAlign: 'left',
                          width: 'auto',
                          color: '#49B4F8',
                        }}>
                        {'  '}Masuk
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

export default Register;
