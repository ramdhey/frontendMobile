import React from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';

const Swtch = ({
  swicthTrue,
  handleToggle,
  H = 0.3,
  paddingHorizontal = '5%',
  paddingVertical = '2%',
  btnBulletW = 0.055,
  btnBulletH = 0.2,
  bgSwicthTrue = '#1C8DDF',
  bgSwicthFalse = '#ECF4FF',
  borderColor = '#AACFE8',
  bgTogleTrue = '#FFFFFF',
  bgTogleFalse = '#CEECFF',
}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={{
        width: '100%',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: swicthTrue === true ? 'flex-end' : 'flex-start',
          width: '100%',
          borderRadius: 20,
          borderWidth: swicthTrue === true ? 0 : 1,
          borderColor: borderColor,
          paddingHorizontal: paddingHorizontal,
          paddingVertical: paddingVertical,
          height: imageHeight * H,
          backgroundColor: swicthTrue === true ? bgSwicthTrue : bgSwicthFalse,
        }}>
        <TouchableOpacity
          onPress={handleToggle}
          style={{
            backgroundColor: swicthTrue === true ? bgTogleTrue : bgTogleFalse,
            width: imageWidth * btnBulletW,
            height: imageHeight * btnBulletH,
            borderRadius: imageWidth / 2,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Swtch;
