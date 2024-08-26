import React, {useCallback, useState} from 'react';
import {
  RefreshControl,
  useColorScheme,
  View,
  FlatList,
  Alert,
} from 'react-native';
import Txt from '../../components/Txt/Txt';
import Container from '../../components/Container/Container';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';
import HeaderBasic from '../../navigation/Headers/HeaderBasic';
import Teman from '../Teman/Teman';
import Grup from '../Group/Grup';
import Anonim from '../Anonim/Anonim';
import Tabs from '../../components/Tabs/Tabs';
import HeadersHome from '../../navigation/Headers/HeadersHome';
import CardList from '../../components/CardBTN/CardList';
import authState from '../../state/auth';
import {useFocusEffect} from '@react-navigation/native';
import {API_BASE_URL} from '@env';
import {useNavigation} from '@react-navigation/native';
import FecthAPIService from '../../services/API/FecthAPIService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import SuccessToast from '../../components/SuccessToast/SuccessToast';
import Toast from 'react-native-root-toast';

const HomeScreenAdmin = () => {
  const {
    token,
    setToken,
    userProfile,
    setuserProfile,
    setAvatar,
    Avatar,
    role,
    setRole,
    setgetFormbyID,
    getFormbyId,
    setLogout,
    listUser,
    setlistUser,
  } = authState();

  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fecthListData = useCallback(async () => {
    const url = `${API_BASE_URL}/admin/users`;
    try {
      const data = await FecthAPIService({
        url: url,
        metode: 'GET',
        token: token,
      });

      if (data) {
        setlistUser(data);
      }
    } catch (error) {
      console.error(
        'Failed to fetch application data using FetchAPIService:',
        error,
      );
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fecthListData();
    }, [fecthListData]),
  );

  console.log(JSON.stringify(listUser));

  const onStatusChange = useCallback(() => {
    fecthListData();
  }, [fecthListData]);

  const handleLogout = async () => {
    // Show confirmation dialog
    Alert.alert(
      'Logout dari Aplikasi',
      'Apakah kamu yakin?',
      [
        {
          text: 'Tidak jadi',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'Ya, yakin',
          onPress: async () => {
            try {
              await EncryptedStorage.removeItem('access_token');
              await EncryptedStorage.removeItem('role_access');
              await AsyncStorage.removeItem('profile');

              // Reset state with Zustand
              setLogout();

              // Navigate to the login or start screen
              const Success = SuccessToast({
                title: `Berhasil Logout`,
                duration: Toast.durations.LONG,
              });
              Success.showToast();
              navigation.navigate('login'); // Adjust this to match your login route
            } catch (error) {
              console.error('Logout failed:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  // const onRefresh = useCallback(() => {
  //   setLoading(true);
  //   setIsRefreshing(true);
  //   loadFlight().then(() => setIsRefreshing(false));
  //   setLoading(false);
  // }, [loadFlight]);
  // console.log({colorScheme})

  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const renderCardList = ({item, index}) => {
    return (
      <CardList
        dataavatar={item?.photo}
        data={item}
        onStatusChange={onStatusChange}
        onPress={() =>
          navigation.navigate('detailUser', {
            itemId: item?.id,
          })
        }
      />
    );
  };
  return (
    <Container useView={true} translucent={true}>
      <HeadersHome admin={true} onPress={handleLogout} />

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          // justifyContent: 'center',
          flex: 1,
          backgroundColor: theme.background,
        }}>
        <FlatList
          // ref={flatListRef}
          // onScroll={event => {
          //   scrollPositionRef.current = event.nativeEvent.contentOffset.y;
          // }}
          data={listUser?.data || []}
          renderItem={renderCardList}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            alignItems: 'center',
            width: '100%',
            paddingBottom: '25%',
            paddingTop: '3%',
            // // flex: 1,
            // justifyContent: 'center',
          }}
          // ListEmptyComponent={() =>
          //   isLoading ? <SkeletonCardFl /> : <ProductTidakTersedia />
          // }
          // refreshControl={
          //   <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          // }
        />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingTop: '1%',
          }}></View>
      </View>
    </Container>
  );
};

export default HomeScreenAdmin;
