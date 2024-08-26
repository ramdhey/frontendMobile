import React from 'react';
import {View} from 'react-native';

const FooterBasic = ({children, backgroundColor = '#FFFFFF'}) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: '3%',
        paddingVertical: '5%',
        backgroundColor: backgroundColor,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 3,
        shadowColor: '#000', // Warna bayangan
        shadowOffset: {width: 0, height: 2}, // Arah dan jarak bayangan
        shadowOpacity: 0.3, // Kedalaman bayangan
        shadowRadius: 4,
      }}>
      {children}
    </View>
  );
};

export default FooterBasic;
