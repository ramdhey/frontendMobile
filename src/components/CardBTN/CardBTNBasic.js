import React from 'react';
import {Dimensions, TouchableOpacity, useColorScheme, View} from 'react-native';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';

const CardBTNBasic = ({
  onPress,
  children,
  heightCard = 'auto',
  widthCard = 1.2,
  backgroundColorCard = '#FFF',
  phCard = '2%',
  pvCard = '2%',
  mr = 0.03,
  borderRadius = 10,
  marginBottom = '0%',
  borderWidth = 0,
  borderColor = '#FFF',
  elevation = 1,
  ml = 0,
  shadowColor = '#000',
  shadowOffset = {width: 0, height: 2},
  shadowOpacity = 0.3,
  shadowRadius = 4,
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85;
  const imageHeight = imageWidth * (115 / screenWidth);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: imageWidth * widthCard,
        height: heightCard,
        backgroundColor: theme.subBackground,
        paddingHorizontal: phCard,
        paddingVertical: pvCard,
        // marginRight: imageWidth * mr,
        // marginLeft: imageWidth * ml,
        borderRadius: borderRadius,
        marginBottom: marginBottom,
        borderWidth: borderWidth,
        borderColor: borderColor,
        elevation: elevation,
        alignSelf: 'center',
        shadowColor: '#000', // Warna bayangan
        shadowOffset: {width: 0, height: 2}, // Arah dan jarak bayangan
        shadowOpacity: 0.3, // Kedalaman bayangan
        shadowRadius: 4, // Kekaburan bayangan
      }}>
      {children}
    </TouchableOpacity>
  );
};

export default CardBTNBasic;
