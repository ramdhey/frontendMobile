import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

const Gambar = ({
  sourceImage,
  w = 0.16,
  h = 0.6,
  style = {},
  resizeMode = FastImage.resizeMode.contain,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);

  const combinedStyle = StyleSheet.flatten([
    {
      width: imageWidth * w,
      height: imageHeight * h,
      backgroundColor: 'transparent',
    },
    style, // style dari child
  ]);
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}>
      <FastImage
        source={sourceImage}
        style={combinedStyle}
        resizeMode={resizeMode}
      />
    </View>
  );
};

export default Gambar;
