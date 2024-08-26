import React from 'react';
import HeaderBasic from './HeaderBasic';
import {TouchableOpacity, useColorScheme, View} from 'react-native';
import Gambar from '../../components/Gambar/Gambar';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';
import Txt from '../../components/Txt/Txt';
import IconBTN from '../../components/BTN/IconBTN';
import AvatarUser from '../../components/Avatar/AvatarUser';
import BTN from '../../components/BTN/BTN';

const HeadersHome = ({admin = false, onPress}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return (
    <HeaderBasic>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          //   paddingHorizontal: '2%',
        }}>
        {/* KIRI */}
        <View
          style={{
            width: '30%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Gambar
              sourceImage={require('../../assets/icons/Logo.png')}
              w={0.4}
              h={0.4}
              style={{alignSelf: 'center', justifyContent: 'flex-start'}}
              resizeMode="cover"
            />
          </TouchableOpacity>
          {/* <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Gambar
              sourceImage={logo}
              w={0.4}
              h={0.4}
              style={{alignSelf: 'center', justifyContent: 'flex-start'}}
            />
            <Txt
              fontSize={17}
              fontType="SemiBold"
              style={{
                textAlign: 'center',
                width: 'auto',
                // color: '#000000',
              }}>
              AJA
            </Txt>
          </View> */}
        </View>
        {/* END KIRI */}
        {/* KANAN */}
        <View
          style={{
            width: '65%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '30%',
              alignItems: 'center',
            }}>
            {admin === true ? (
              <BTN
                onPress={onPress}
                style={{
                  width: '100%',
                  backgroundColor: '#0375BC',
                  paddingVertical: '3%',
                  opacity: 0.9,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Txt
                  fontSize={11}
                  fontType="SemiBold"
                  style={{
                    textAlign: 'center',
                    width: 'auto',
                    color: '#FFF',
                    // paddingTop: '2%',
                  }}>
                  Logout
                </Txt>
              </BTN>
            ) : null}
          </View>
        </View>
        {/* END KANAN */}
      </View>
    </HeaderBasic>
  );
};

export default HeadersHome;
