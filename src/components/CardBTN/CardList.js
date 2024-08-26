import React, {useState} from 'react';
import {Dimensions, useColorScheme, View, Alert} from 'react-native';
import CardBTNBasic from './CardBTNBasic';
import Txt from '../Txt/Txt';
import Gambar from '../Gambar/Gambar';
import AvatarUser from '../Avatar/AvatarUser';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';
import Swtch from '../Swicth/Swicth';
import {API_BASE_URL} from '@env';
import axios from 'axios';
import authState from '../../state/auth';
import FecthAPIService from '../../services/API/FecthAPIService';

const CardList = ({dataavatar, data, onStatusChange, onPress}) => {
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
  } = authState();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  const [aktifDeactive, setAktifDeactive] = useState(data?.status);

  const handleAktifDeactif = async () => {
    const newStatus = !aktifDeactive;
    console.log(`${API_BASE_URL}/users/${data?.id}`);

    Alert.alert(
      `Ubah Status`,
      `Apakah Anda yakin ingin mengubah status pengguna ini menjadi ${
        newStatus ? true : false
      }?`,
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya, Ubah',
          onPress: async () => {
            try {
              // Panggil FecthAPIService
              const response = await FecthAPIService({
                url: `${API_BASE_URL}/users/${data?.id}/status`,
                metode: 'PUT',
                token: token,
                body: {status: newStatus},
              });
              console.log({newStatus});

              if (response && response.status === 200) {
                setAktifDeactive(newStatus);
                Alert.alert(
                  'Sukses',
                  `Status pengguna berhasil diubah menjadi ${
                    newStatus ? 'Aktif' : 'Tidak Aktif'
                  }.`,
                );
                onStatusChange();
              } else {
                throw new Error('Failed to update status');
              }
            } catch (error) {
              console.error('Error updating status:', error);
              Alert.alert('Error', 'Gagal mengubah status pengguna.');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <CardBTNBasic onPress={onPress}>
      <View
        style={{
          width: '98%',
          //   paddingHorizontal: '2%',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        {/*  */}
        <View
          style={{
            width: '25%',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-start',
            flexDirection: 'row',
          }}>
          <View>
            <AvatarUser dataAvatar={dataavatar} />
          </View>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              alignSelf: 'flex-start',
              justifyContent: 'center',
              paddingLeft: '5%',
            }}>
            <View>
              <Txt
                maxChars={25}
                numberOfLines={1}
                fontSize={11}
                fontType="Bold"
                style={{
                  textAlign: 'left',
                  width: '100%',
                  color: theme.text,
                  // textAlign: 'left',
                }}>
                {data?.fullname}
              </Txt>
            </View>
            <View
              style={{
                paddingVertical: '5%',
              }}>
              <View>
                <Txt
                  maxChars={25}
                  numberOfLines={1}
                  fontSize={10}
                  style={{
                    textAlign: 'left',
                    width: '100%',
                    color: theme.text,
                    // textAlign: 'left',
                  }}>
                  {data?.email}
                </Txt>
              </View>
            </View>

            <View
              style={{
                paddingVertical: '5%',
              }}>
              <View
                style={{
                  width: imageWidth * 0.2,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  backgroundColor:
                    data?.status === true ? '#49B4F8' : '#fb380e',
                  borderRadius: 10,
                  padding: '1%',
                }}>
                <Txt
                  //   numberOfLines={1}
                  fontSize={9}
                  // fontType="Medium"
                  style={{
                    textAlign: 'center',
                    width: 'auto',
                    color: '#FFFF',
                    // textAlign: 'left',
                  }}>
                  {data?.status === true ? ' Aktif' : ' Tidak Aktif'}
                </Txt>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '12%',
          }}>
          <Swtch
            swicthTrue={aktifDeactive}
            handleToggle={handleAktifDeactif}
            H={0.3}
            paddingHorizontal="5%"
            paddingVertical="3%"
            btnBulletW={0.05}
            btnBulletH={0.18}
            borderColor="#CEECFF"
            bgSwicthFalse="#F8FBFF"
            bgTogleFalse="#1C8DDF"
          />
        </View>
        {/*  */}
      </View>
    </CardBTNBasic>
  );
};

export default CardList;
