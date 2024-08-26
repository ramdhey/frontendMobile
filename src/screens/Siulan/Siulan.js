import React from 'react';
import {useColorScheme, View} from 'react-native';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';
import Container from '../../components/Container/Container';
import Txt from '../../components/Txt/Txt';
import HeaderApp from '../../navigation/Headers/HeaderApp';

const Siulan = () => {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return (
    <Container useView={true} translucent={true}>
      {/* <HeaderApp title='Siulan' /> */}
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: theme.background,
        }}>
        <Txt
          fontSize={22}
          fontType="Medium"
          style={{
            textAlign: 'center',
            width: 'auto',
            //   color: '#272727',
          }}>
          Siulan
        </Txt>
      </View>
    </Container>
  );
};

export default Siulan;
