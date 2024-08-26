import React from 'react';
import {useColorScheme, View, TouchableOpacity} from 'react-native';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';
import Txt from '../../components/Txt/Txt';
import HeaderBasic from './HeaderBasic';
import IconBTN from '../../components/BTN/IconBTN';
import AvatarUser from '../../components/Avatar/AvatarUser';
import Gambar from '../../components/Gambar/Gambar';
import {useNavigation} from '@react-navigation/native';

const HeaderApp = ({title = 'title'}) => {
  const navigation = useNavigation();
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
            width: '40%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            paddingVertical: '3%',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 'auto',
            }}>
            <Gambar
              sourceImage={require('../../assets/images/chevronLeft.png')}
              w={0.2}
              h={0.3}
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />
          </TouchableOpacity>
          <Txt
            fontSize={13}
            fontType="SemiBold"
            style={{
              textAlign: 'center',
              width: 'auto',
              // color: '#000000',
            }}>
            {title}
          </Txt>
        </View>
        {/* END Kiri */}
      </View>
    </HeaderBasic>
  );
};

export default HeaderApp;
