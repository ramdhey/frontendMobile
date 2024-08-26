import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
  useColorScheme,
} from 'react-native';
// import ModalKomponen from './ModalKomponen';
import {ScaleFontSize} from './MOD/ScaleFontSize';
import Gambar from '../Gambar/Gambar';
import FastImage from 'react-native-fast-image';

const AvatarUser = ({
  setSelectedAvatar,
  selectedAvatar,
  w = 1,
  h = 1,
  dataAvatar,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const avatarNull = isDarkMode
    ? require('../../assets/icons/Logo.png')
    : require('../../assets/icons/Logo.png');

  const avatars =
    dataAvatar === undefined || dataAvatar === null || dataAvatar === ''
      ? avatarNull
      : dataAvatar;
  const handleSelectAvatar = avatarId => {
    setSelectedAvatar(avatarId);
    setModalVisible(false);
  };

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);

  return (
    <>
      <View
        style={{
          width: imageWidth * 0.20,
          height: imageHeight*0.7,
          borderRadius: 50,
          // backgroundColor: theme.text,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
        <Gambar
          sourceImage={{uri: avatars}}
          w={w}
          h={h}
          style={{alignSelf: 'center', justifyContent: 'center'}}
          resizeMode={FastImage.resizeMode.cover}
        />
        {/* <Image
          source={avatars}
          style={{
            width: imageWidth * 0.3,
            height: imageHeight * 1.1,
            alignItems: 'center',
            borderRadius: imageWidth * 0.5,
          }}
        /> */}
      </View>
    </>
  );
};

export default AvatarUser;
