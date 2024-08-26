// File CustomModal.js
import React from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Gambar from '../Gambar/Gambar';

const CustomModal = ({
  isVisible,
  onClose,
  children,
  h = 8,
  tengah = false,
  // bawah=true
  backgroundColor = '#FFFFFF',
}) => {
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={{
        justifyContent: tengah === false ? 'flex-end' : 'center',
        margin: tengah === false ? '0%' : '10%',
        marginTop: tengah === false ? '40%' : '80%',
      }}>
      <KeyboardAwareScrollView
        style={{flex: 1}}
        resetScrollToCoords={{x: 0, y: 0}}
        contentContainerStyle={{flexGrow: 1}}
        scrollEnabled={false} // you can experiment with this option - it's optional
      >
        <View
          style={{
            width: '100%',
            backgroundColor: backgroundColor,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: imageHeight * 8,
          }}>
          <View
            style={{
              width: '100%',
            }}>
            <TouchableOpacity onPress={onClose}>
             
              {/* <Image
                source={require('../assets/images/Icons/SwipeDownIcn.png')}
                style={{
                  width: '20%',

                  backgroundColor: 'transparent',
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              /> */}
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: '5%',
              paddingVertical: '2%',
            }}>
            {children}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default CustomModal;
