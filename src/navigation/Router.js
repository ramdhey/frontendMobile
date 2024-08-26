import React, {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cek from '../screens/Cek';
import NoInternet from '../screens/NoInternet/NoInternet';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import {Tabs} from './Tabs';
import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import HomeScreenAdmin from '../screens/HomeScreen/HomeScreenAdmin';
import HomeScreenUser from '../screens/HomeScreen/HomeScreenUser';
import authState from '../state/auth';
import IsiFormPegawai from '../screens/IsiFormPegawai/IsiFormPegawai';
import RegistrasiBerhasil from '../screens/RegistrasiBerhasil/RegistrasiBerhasil';
import EditFormPegawai from '../screens/IsiFormPegawai/EditFormPegawai';
import LihatForm from '../screens/IsiFormPegawai/Lihatform';
import EditFormPegawaiFromAdmin from '../screens/IsiFormPegawai/EditFormPegawaiFromAdmin';
import DetailUser from '../screens/DetailUser/DetailUser';

const Routeing = () => {
  const [isConnected, setIsConnected] = useState(true);
  const route = createNativeStackNavigator();
  const {
    token,
    setToken,
    userProfile,
    setuserProfile,
    setAvatar,
    Avatar,
    role,
    setRole,
  } = authState();

  const isAuth = !!token;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected && state.isInternetReachable);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <route.Navigator initialRouteName={'splashScreen'}>
        {isConnected ? (
          <>
            <route.Screen
              name="splashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <route.Screen
              name="cekAja"
              component={Cek}
              options={{headerShown: false}}
            />
            <route.Screen
              name="login"
              component={Login}
              options={{headerShown: false}}
            />
            <route.Screen
              name="register"
              component={Register}
              options={{headerShown: false}}
            />
            <route.Screen
              name="registrasiBerhasil"
              component={RegistrasiBerhasil}
              options={{headerShown: false}}
            />

            <route.Screen
              name="homeAdmin"
              component={isAuth ? HomeScreenAdmin : Login}
              options={{headerShown: false}}
            />

            <route.Screen
              name="homeUser"
              component={isAuth ? HomeScreenUser : Login}
              options={{headerShown: false}}
            />

            <route.Screen
              name="isiFormPegawai"
              component={isAuth ? IsiFormPegawai : Login}
              options={{headerShown: false}}
            />
            <route.Screen
              name="lihatForm"
              component={isAuth ? LihatForm : Login}
              options={{headerShown: false}}
            />
            <route.Screen
              name="editFormPegawai"
              component={isAuth ? EditFormPegawai : Login}
              options={{headerShown: false}}
            />

            <route.Screen
              name="editFormPegawaiFromAdmin"
              component={isAuth ? EditFormPegawaiFromAdmin : Login}
              options={{headerShown: false}}
            />
            <route.Screen
              name="detailUser"
              component={isAuth ? DetailUser : Login}
              options={{headerShown: false}}
            />
            {/* <route.Screen
              name="menu"
              component={Tabs}
              options={{headerShown: false}}
            /> */}

            {/* <route.Screen
              name="menu"
              component={isAuth ? BottomTabs : Login}
              options={{headerShown: false}}
            /> */}
          </>
        ) : (
          <route.Screen
            name="NoInternet"
            component={NoInternet}
            options={{headerShown: false}}
          />
        )}
      </route.Navigator>
    </NavigationContainer>
  );
};

export default Routeing;
