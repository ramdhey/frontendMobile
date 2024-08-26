import React from 'react';
import {TouchableOpacity} from 'react-native';
import Gambar from '../Gambar/Gambar';

const IconBTN = ({icon, w = 0.4, h = 0.3, style}) => {
  return (
    <TouchableOpacity
      style={{
        width: 'auto',
        alignItems: 'center',
        justifyContent:'center'
      }}>
      <Gambar sourceImage={icon} w={w} h={h} style={style} />
    </TouchableOpacity>
  );
};

export default IconBTN;
