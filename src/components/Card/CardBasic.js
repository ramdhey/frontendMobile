import React from 'react';
import {View} from 'react-native';

const CardBasic = ({
  children,
  elevation = 3,
  borderRadius = 5,
  backgroundColor = '#FFFFFF',
  width = '98%',
  height = 'auto',
  paddingHorizontal = '2%',
  paddingVertical = '3%',
  shadowRadius = 4,
  shadowOpacity = 0.3,
  shadowOffset = {width: 0, height: 2},
  shadowColor = '#000',
}) => {
  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: backgroundColor,
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: borderRadius,
        elevation: elevation,
        shadowColor: '#000', // Warna bayangan
        shadowOffset: {width: 0, height: 2}, // Arah dan jarak bayangan
        shadowOpacity: 0.3, // Kedalaman bayangan
        shadowRadius: 4, // Kekaburan bayangan
      }}>
      {children}
    </View>
  );
};

export default CardBasic;
