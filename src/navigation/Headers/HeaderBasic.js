import React from 'react';
import {useColorScheme, View} from 'react-native';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';

const HeaderBasic = ({children, backgroundColor = '#FFFF'}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const bg = theme.tabs || backgroundColor;
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: '3%',
        paddingTop: '10%',
        backgroundColor: bg,
        paddingVertical: '2%',
        elevation: 5,
        shadowColor: '#000', // Warna bayangan
        shadowOffset: {width: 0, height: 2}, // Arah dan jarak bayangan
        shadowOpacity: 0.3, // Kedalaman bayangan
        shadowRadius: 4,
      }}>
      {children}
    </View>
  );
};

export default HeaderBasic;
