import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const BTN = ({children, onPress, style, ...props}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '30%',
    paddingVertical: '3%',
    paddingHorizontal: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C057B',
    borderRadius: 10,
  },
});

export default BTN;
