import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import Toast from 'react-native-root-toast';
import Txt from '../Txt/Txt';
import Gambar from '../Gambar/Gambar';

const FailToast = ({
  message,
  title,
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
          height: 'auto',
          maxHeight: imageHeight * 2,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: '1%',
          paddingVertical: '6%',
          borderRadius: 20,
        }}>
        <View
          style={{
            width: 'auto',

            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: '2%',
            paddingVertical: '5%',
          }}>
          <Gambar
            sourceImage={require('../../assets/gif/Failed.gif')}
            w={0.4}
            h={1}
            style={{alignSelf: 'center'}}
          />

          <Txt
            fontSize={12}
            style={{
              color: '#D93447',
              fontFamily: 'Poppins-Bold',
              width: 'auto',
              maxWidth: imageWidth * 1,
              textAlign: 'center',
            }}>
            {title}
          </Txt>
          <Txt
            fontSize={14}
            style={{
              color: '#D93447',
              fontFamily: 'Poppins-Bold',
              width: 'auto',
              maxWidth: imageWidth * 1,
              textAlign: 'center',
              paddingTop: '2%',
              // paddingHorizontal: '2%',
            }}>
            {message}
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
        textColor: '#D93447',
        shadowColor: '#000',
        opacity: 1,
        borderRadius: 20,
      },
    );
  };

  return {showToast};
};

export default FailToast;
