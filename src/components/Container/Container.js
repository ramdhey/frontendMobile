import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  ScrollView,
  View,
  useColorScheme,
} from 'react-native';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';

const Container = ({
  backgroundColor = 'transparent',
  barStyle = 'dark-content',
  translucent = false,
  children,
  useScrollView = false,
  useView = false,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;
  const bgColor = backgroundColor || theme.background;
  const renderChildren = () => {
    if (useScrollView) {
      return (
        <ScrollView
          contentContainerStyle={{flex: 1, alignItems: 'center'}}
          style={{width: '100%'}}>
          {children}
        </ScrollView>
      );
    } else if (useView) {
      return (
        <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
          {children}
        </View>
      );
    } else {
      // Default case
      return (
        <SafeAreaView style={{flex: 1, width: '100%', alignItems: 'center'}}>
          {children}
        </SafeAreaView>
      );
    }
  };
  // How To Use on Child

  {
    /* <CRT useScrollView>
  
</CRT>

<CRT useView>
  
</CRT>

<CRT>
  
</CRT> */
  }

  //END How To Use on Child

  return (
    <>
      <StatusBar
        translucent={translucent}
        barStyle={theme.statusBarStyle}
        backgroundColor={bgColor}
      />
      {renderChildren()}
    </>
  );
};

export default Container;
