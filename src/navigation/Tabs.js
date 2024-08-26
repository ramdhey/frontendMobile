import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreenAdmin';
import Siulan from '../screens/Siulan/Siulan';
import Storie from '../screens/Storie/Storie';
import Called from '../screens/Called/Called';
import Gambar from '../components/Gambar/Gambar';
import {useColorScheme} from 'react-native';
import {darkTheme} from '../config/themes/Dark';
import {lightTheme} from '../config/themes/Light';

const Tab = createBottomTabNavigator();

export const Tabs = ({navigation}) => {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const beranda =
    colorScheme === 'dark'
      ? require('../assets/images/HomeLight.png')
      : require('../assets/images/homedark.png');
  const profile =
    colorScheme === 'dark'
      ? require('../assets/images/profileLight.png')
      : require('../assets/images/ProfileDark.png');

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0375BC',
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'PlusJakartaSans-Medium',
        },
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          borderTopLeftRadius: 20, // Set the radius size as per your design
          borderTopRightRadius: 20, // Set the radius size as per your design
          position: 'absolute', // This makes the tab bar float above the screen
          bottom: '0.1%',
          left: '0%',
          right: '0%',
          height: '8%', // Adjust the height as needed
          // borderTopWidth: 1,
          // borderWidth: 0,
          // borderColor:'#000',

          backgroundColor: theme.tabs, // Updated background color to white
          elevation: 5,
          shadowOffset: {width: 0, height: -1},
          shadowOpacity: 0.1,
          shadowRadius: 3,
          paddingBottom: '4%',
        },
      }}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Gambar
              sourceImage={
                focused ? require('../assets/images/homeactive.png') : beranda
              }
              w={0.2}
              h={0.3}
            />
          ),
          tabBarLabel: 'Beranda',
        }}
      />
      <Tab.Screen
        name={'Siulan'}
        component={Siulan}
        options={{
          tabBarIcon: ({focused}) => (
            <Gambar
              sourceImage={
                focused
                  ? require('../assets/images/profileActive.png')
                  : profile
              }
              w={0.2}
              h={0.3}
            />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};
