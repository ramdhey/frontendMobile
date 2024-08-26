import React from 'react';
import {Text, useColorScheme} from 'react-native';
import {View} from 'react-native';
import {darkTheme} from '../config/themes/Dark';
import {lightTheme} from '../config/themes/Light';
import Txt from '../components/Txt/Txt';
import Container from '../components/Container/Container';
import BTN from '../components/BTN/BTN';
import FooterBasic from '../navigation/Footers/FooterBasic';
import HeaderBasic from '../navigation/Headers/HeaderBasic';
import CardBasic from '../components/Card/CardBasic';
import CardBTNBasic from '../components/CardBTN/CardBTNBasic';
import Teman from './Teman/Teman';
import Grup from './Group/Grup';
import Anonim from './Anonim/Anonim';
import Tabs from '../components/Tabs/Tabs';
import CardChat from '../components/CardBTN/CardList';
import AvatarUser from '../components/Avatar/AvatarUser';

const Cek = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;

  const tabConfig = [
    {
      label: 'Teman',
      component: Teman,
      prop: 'teman',
    },
    {
      label: 'Grup',
      component: Grup,
      prop: 'grup',
    },
    {
      label: 'Anonim',
      component: Anonim,
      prop: 'anonim',
    },
  ];
  const items = {
    teman: [], // Asumsikan data ini dari state atau props
    grup: [],
    anonim: [],
  };

  return (
    <Container useView={true} translucent={true}>
      {/* <HeaderBasic /> */}
      {/* <Tabs items={items} 
      // loading={loading} 
      tabConfig={tabConfig} /> */}
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: theme.background,
        }}>
       
        {/* <Txt
          fontSize={22}
          fontType="Medium"
          style={{
            textAlign: 'center',
            width: 'auto',
            //   color: '#272727',
          }}>
          TAI
        </Txt> */}
        {/* <CardBasic>
          <Txt
            fontSize={22}
            fontType="Medium"
            style={{
              textAlign: 'center',
              width: 'auto',
              //   color: '#272727',
            }}>
            TAI
          </Txt>
        </CardBasic> */}

        <CardChat />
        {/* <CardBTNBasic>
          <Txt
            fontSize={22}
            fontType="Medium"
            style={{
              textAlign: 'center',
              width: 'auto',
              color: '#272727',
            }}>
            TAI
          </Txt>
        </CardBTNBasic> */}
        {/* <BTN
          style={{
            width: '88%',
            backgroundColor: '#ddd',
            paddingVertical: '8%',
          }}>
          <Txt
            fontSize={22}
            fontType="Medium"
            style={{
              textAlign: 'center',
              width: 'auto',
              color: '#FFFF',
            }}>
            TAI
          </Txt>
        </BTN> */}
      </View>
      {/* <FooterBasic /> */}
    </Container>
  );
};

export default Cek;
