import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import Txt from '../Txt/Txt';
import CustomModal from '../CustomModal/CustomModal';
import Gambar from '../Gambar/Gambar';

const PickerCustom = ({
  labelOpsional = false,
  displayLabelOpsional,
  selectedValue,
  icon = true,
  onValueChange,
  items,
  iconLeft = false,
  iconWidthL = 0.09,
  iconHeightL = 0.255,
  colorsTextItemPick = '#000',
  additionalStyles = {},
  borderColor = '#272727',
  labelOpsionColor = '#046DB9',
  labelPH = '9%',
  fontSize = 12,
  colorTxt = '#000', // Perubahan di sini untuk iOS
  fntSize = 16, // Perubahan di sini untuk iOS
  sourceImage,
  paddingVer = '10%',
  modalTitle = 'Select Option',
  w = 0.43,
  mt = '0%',
  tengah = false,
  backgroundColor = '#FFFFFF',
  ...restProps
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemLabel, setSelectedItemLabel] = useState('');
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const isTablet =
    Platform.isPad || (screenWidth >= 600 && screenHeight >= 600);

  useEffect(() => {
    const selectedItem = items.find(item => item.value === selectedValue);
    if (selectedItem) {
      setSelectedItemLabel(selectedItem.label);
    } else {
      setSelectedItemLabel(modalTitle);
    }
  }, [selectedValue, items]);

  const handleChangeValue = (itemValue, itemLabel) => {
    onValueChange(itemValue);
    setSelectedItemLabel(itemLabel);
    setIsModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={[
          styles.touchableContainer,
          {
            borderColor: borderColor,
            backgroundColor: backgroundColor,
          },
        ]}>
        <View style={styles.container}>
          {iconLeft && (
            <View style={styles.iconContainer}>
              <Gambar
                sourceImage={sourceImage}
                w={iconWidthL}
                h={iconHeightL}
                style={styles.iconStyle}
              />
            </View>
          )}
          <Txt
            numberOfLines={1}
            ellipsizeMode={'tail'}
            fontSize={fontSize}
            style={[
              styles.textStyle,
              {
                color: colorTxt,
                paddingLeft: iconLeft ? 0 : '5%',
              },
            ]}>
            {selectedItemLabel}
          </Txt>
        </View>
      </TouchableOpacity>

      <CustomModal
        tengah={tengah}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContent}>
          <Txt fontSize={12} style={styles.modalTitle}>
            {modalTitle}
          </Txt>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => handleChangeValue(item.value, item.label)}>
                <Txt fontSize={fontSize} style={styles.itemText}>
                  {item.label}
                </Txt>
              </TouchableOpacity>
            )}
          />
        </View>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '5%',
    marginTop: '0%',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: '2%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    alignSelf: 'center',
  },
  textStyle: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'left',
    width: 'auto',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: '2%',
    paddingVertical: '5%',
  },
  modalTitle: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'left',
  },
  itemContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '2%',
  },
  itemText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});

export default PickerCustom;
