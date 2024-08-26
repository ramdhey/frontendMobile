import React from 'react';
import {useColorScheme, View} from 'react-native';
import Txt from '../../components/Txt/Txt';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';

const Teman = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: theme.background,
      }}>
      <Txt
        style={{
          textAlign: 'center',
          width: 'auto',
          //   color: '#272727',
        }}>
        Teman
      </Txt>
    </View>
  );
};

export default Teman;
