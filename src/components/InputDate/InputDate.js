import React, {useState} from 'react';
import {Dimensions, TouchableOpacity, View, Image, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Txt from '../Txt/Txt';


const InputDate = ({
  value,
  placeHolder = 'Pilih Tanggal',
  iconLeft,
  placeholderTextColor = '#6231C9',
  colorText = '#6231C9',
  borderColor = '#6231C9',
  borderRadiusSize = 10,
  onChangeDate,
  backgroundColor,
  colorTxt,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirm = date => {
    setDatePickerVisibility(false);
    onChangeDate(formatDate(date));
  };

  const formatDate = date => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setDatePickerVisibility(true)}
        style={{
          width: '100%',
          borderRadius: borderRadiusSize,
          borderColor: borderColor,
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: '9%',
          marginTop: '0%',
          backgroundColor: backgroundColor,
        }}>
        <Txt
          fontSize={13}
          style={{
            color: colorTxt,
            fontFamily: 'Poppins-Regular',
            width: 'auto',
            textAlign: 'center',
          }}>
          {formatDate(new Date(value))}
        </Txt>
      
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
    </>
  );
};

export default InputDate;
