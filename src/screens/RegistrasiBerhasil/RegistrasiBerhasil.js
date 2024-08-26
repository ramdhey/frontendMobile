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
import Countdown from '../../components/Countdown/Countdown';

const RegistrasiBerhasil = () => {
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

  return (
    <Container useView={true} translucent={true} backgroundColor="transparent">
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
              Pendafataran Akun Berhasil
            </Txt>

            <View
              style={{
                width: '90%',
                paddingVertical: '5%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Selamat akun mu berhasil terdaftar, silahkan lakukan konfirmasi
                akun lewat link yang dikirimkan ke email yang didaftarkan.
              </Txt>
            </View>

            <View
              style={{
                width: '90%',
                paddingVertical: '5%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Lanjut kehalaman Login atau menunggu waktu Konfirmasi akan
                segera berakhir dalam waktu.
              </Txt>
              <Countdown initialSeconds={3600} />
            </View>

            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: '3%',
              }}>
              <BTN
                onPress={() => navigation.navigate('login')}
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
                  Login
                </Txt>
              </BTN>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Container>
  );
};

export default RegistrasiBerhasil;
