import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Toast from 'react-native-root-toast';
import Txt from '../Txt/Txt';
import Gambar from '../Gambar/Gambar';

const SuccessToast = ({
  title = '',
  message = '',
  duration = Toast.durations.SHORT,
  position = Toast.positions.CENTER,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth); // gunakan aspek rasio yang sama seperti gambar asli

  const showToast = () => {
    Toast.show(
      <View
        style={{
          width: 'auto',
          height: imageHeight * 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: '1%',
          paddingVertical: '6%',
          borderRadius: 20,
        }}>
        <View
          style={{
            width: '90%',

            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: '2%',
            paddingVertical: '5%',
          }}>
          <Gambar
            sourceImage={require('../../assets/gif/success_neww.gif')}
            w={0.4}
            h={1}
            style={{alignSelf: 'center'}}
          />

          {message === '' ? null : (
            <Txt
              fontSize={14}
              fontType="SemiBold"
              style={{
                textAlign: 'center',
                width: '90%',
                color: '#13930A',
              }}>
              {message}
            </Txt>
          )}
          <Txt
            fontSize={14}
            fontType="SemiBold"
            style={{
              textAlign: 'center',
              width: '90%',
              color: '#13930A',
            }}>
            {title}
          </Txt>
        </View>
      </View>,

      {
        duration,
        position,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: '#FFFFFF',
        textColor: '#13930A',
        opacity: 1,
        borderRadius: 20,
      },
    );
  };

  return {showToast};
};

export default SuccessToast;
