import React from 'react';
import {Text, StyleSheet, useColorScheme} from 'react-native';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';
import {ScaleFontSize} from '../../utils/scalefontSize/ScaleFOntSize';

const Txt = ({
  numberOfLines,
  ellipsizeMode,
  children,
  fontSize = 14,
  fontType = 'Regular',
  style = {},
  maxChars,
}) => {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const getFontFamily = weight => {
    switch (weight) {
      case 'Medium':
        return 'PlusJakartaSans-Medium';
      case 'SemiBold':
        return 'PlusJakartaSans-SemiBold';
      case 'Bold':
        return 'PlusJakartaSans-Bold';
      case 'ExtraBold':
        return 'PlusJakartaSans-ExtraBold';
      default:
        return 'PlusJakartaSans-Regular';
    }
  };

  const defaultStyle = {
    color: theme.text, // Menggunakan warna teks dari tema
    fontFamily: getFontFamily(fontType), // Menggunakan fungsi getFontFamily
    width: '100%',
  };
  const formattedText =
    maxChars && children.length > maxChars
      ? children.substring(0, maxChars) + '...'
      : children;

  return (
    <Text
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[
        defaultStyle, // Gunakan defaultStyle yang didefinisikan di atas
        {fontSize: ScaleFontSize(fontSize)}, // Skala ukuran font
        style, // Memungkinkan gaya tambahan dari komponen anak
      ]}>
      {formattedText}
    </Text>
  );
};

// Gaya default untuk komponen CustomText
const styles = StyleSheet.create({
  defaultStyle: {
    color: '#000000',
    fontFamily: 'PlusJakartaSans-SemiBold',
    width: '100%',
  },
});

export default Txt;
