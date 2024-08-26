import React from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Gambar from '../Gambar/Gambar';

const InputText = ({
  setPilih,
  onFocus,
  iconLeft,
  iconRight,
  iconStyle,
  placeholder,
  placeholderTextColor = '#272727',
  fontFamily,
  fontSize,
  color = '#000',
  borderColor = '#D7D7D7',
  bgColor,
  width,
  iconWidthL = 0.09,
  iconHeightL = 0.255,
  iconWidthR = 0.09,
  iconHeightR = 0.255,
  max,
  autoFocus = false,
  clearOnchange = false,
  secureTextEntry = false,
  clearInput,
  autoCapitalize = 'none',
  value, // Menambahkan properti value
  onChangeText, // Menambahkan properti onChangeText
  onBlur, // Menambahkan properti onBlur
  keyboardType = 'default', // Menambahkan properti keyboardType
  //   KEYBOARD TYPE
  // default: Keyboard standar dengan huruf dan angka.
  // numeric: Keyboard numerik untuk memasukkan angka.
  // email-address: Keyboard khusus untuk memasukkan alamat email.
  // phone-pad: Keyboard khusus untuk memasukkan nomor telepon.
  // decimal-pad: Keyboard numerik dengan titik desimal (untuk memasukkan angka desimal).
  // visible-password: Keyboard dengan opsi untuk menyembunyikan atau menampilkan karakter sandi.
  // ascii-capable: Keyboard yang mampu menampilkan karakter ASCII khusus.
  // number-pad: Keyboard numerik dengan tombol khusus untuk memasukkan angka.
  // url: Keyboard khusus untuk memasukkan URL.
  ...props
}) => {
  const colorScheme = useColorScheme();
  const textColor = colorScheme === 'dark' ? color : color;
  const backgroundColor = colorScheme === 'dark' ? '#333' : bgColor;
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  //   const clearInput = () => {
  //     onChangeText('');
  //     setPilih(0);
  //   };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: borderColor,
        borderRadius: 10,
        borderColor: borderColor,
        width: width,
        paddingHorizontal: '1%',
        backgroundColor: backgroundColor,
        paddingVertical: '2%',
      }}>
      {iconLeft && (
        <View
          style={{
            width: '15%',
          }}>
          <Gambar
            sourceImage={iconLeft}
            w={iconWidthL}
            h={iconHeightL}
            // style={{marginRight: '2%', marginLeft: '2%'}}
          />
        </View>
      )}
      <TextInput
        autoFocus={autoFocus}
        onFocus={onFocus}
        style={[
          styles.textInput,
          {
            fontFamily,
            color: textColor,
            fontSize,
          },
        ]}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value} // Menggunakan properti value
        onChangeText={onChangeText} // Menggunakan properti onChangeText
        onBlur={onBlur} // Menggunakan properti onBlur
        keyboardType={keyboardType}
        maxLength={max}
        {...props} // untuk properti lainnya seperti onChangeText, value, dll.
      />
      {clearOnchange === true
        ? iconRight && (
            <TouchableOpacity
              onPress={clearInput}
              style={{
                marginRight: '3%',
              }}>
              <Gambar
                sourceImage={iconRight}
                w={iconWidthR}
                h={iconHeightR}
                // style={{alignSelf: 'center'}}
              />
            </TouchableOpacity>
          )
        : iconRight && (
            <Gambar
              sourceImage={iconRight}
              w={iconWidthR}
              h={iconHeightR}
              // style={{alignSelf: 'center'}}
            />
          )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    padding: 10,
  },
});

export default InputText;
