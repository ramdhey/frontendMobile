import React, {useCallback, useEffect, useState} from 'react';
import {
  RefreshControl,
  useColorScheme,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Toast from 'react-native-root-toast';
import {format, parseISO} from 'date-fns';
import {id} from 'date-fns/locale';
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
import {API_BASE_URL} from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import FecthAPIService from '../../services/API/FecthAPIService';
import Gambar from '../../components/Gambar/Gambar';
import BTN from '../../components/BTN/BTN';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import SuccessToast from '../../components/SuccessToast/SuccessToast';

const HomeScreenUser = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  const colorScheme = useColorScheme();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
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
  // console.log(JSON.stringify(getFormbyId));
  const formatDate = dateString => {
    // Pastikan string tanggal tidak kosong dan valid
    if (!dateString) return '';

    // Parse string ISO8601 ke objek Date
    const date = parseISO(dateString);

    // Format tanggal ke format yang diinginkan
    return format(date, 'EEEE, dd-MM-yyyy', {locale: id});
  };
  const idUser = userProfile?.data?.id;

  const fetchProfileData = useCallback(async () => {
    if (!token) return; // Pastikan token tersedia

    setLoading(true);
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(`${API_BASE_URL}/profile`, {headers});
      if (response.status === 200) {
        const userInfoString = JSON.stringify(response.data); // Make sure to serialize only the data part if it's an object
        await AsyncStorage.setItem('profile', userInfoString);
        const userInfoStringRetrieved = await AsyncStorage.getItem('profile');
        const userInfo = JSON.parse(userInfoStringRetrieved);
        console.log(userInfo);
        setuserProfile(userInfo);
      }
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch profile data:', error);
    } finally {
      setLoading(false);
    }
  }, [token, setuserProfile]); // Dependensi untuk useCallback

  // Memantau perubahan pada userProfile.data.photo atau userProfile.data.fullname
  useEffect(() => {
    if (
      userProfile &&
      (userProfile?.data?.photo || userProfile?.data?.fullname)
    ) {
      fetchProfileData(); // Menjalankan fetchProfileData jika ada perubahan
    }
  }, [userProfile?.data?.photo, userProfile?.data?.fullname, fetchProfileData]);

  // const onRefresh = useCallback(() => {
  //   setLoading(true);
  //   setIsRefreshing(true);
  //   loadFlight().then(() => setIsRefreshing(false));
  //   setLoading(false);
  // }, [loadFlight]);
  // console.log({colorScheme})

  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const [userData, setUserData] = useState(null);

  const fetchApplicationData = useCallback(async () => {
    if (!userProfile?.data?.id || !token) return;
    const url = `${API_BASE_URL}/application`;
    try {
      const data = await FecthAPIService({
        url: url,
        metode: 'GET',
        token: token,
      });

      if (data) {
        setgetFormbyID(data);
      }
    } catch (error) {
      console.error(
        'Failed to fetch application data using FetchAPIService:',
        error,
      );
    }
  }, [token, userProfile?.data?.id]);
  console.log({userData});

  useFocusEffect(
    useCallback(() => {
      fetchApplicationData(); // Fetch data setiap kali layar difokuskan
    }, [fetchApplicationData]),
  );

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchApplicationData().finally(() => setIsRefreshing(false));
  }, [fetchApplicationData]);

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

  return (
    <Container useView={true} translucent={true}>
      <HeadersHome />

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          // justifyContent: 'center',
          flex: 1,
          backgroundColor: theme.background,
        }}>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Txt fontSize={16} fontType="SemiBold" style={{color: theme.text}}>
              Loading...
            </Txt>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              width: '100%',
              alignItems: 'center',
              backgroundColor: theme.background,
            }}
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                paddingVertical: '2%',
              }}>
              {/* Card */}
              <View
                style={{
                  width: imageWidth * 1.1,
                  alignItems: 'center',
                  paddingHorizontal: '2%',
                  paddingVertical: '5%',
                  backgroundColor: theme.subBackground,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    width: imageWidth * 0.28,
                    height: imageHeight,
                    borderRadius: 50,
                    backgroundColor: theme.text,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                  <Gambar
                    sourceImage={{uri: userProfile?.data?.photo}}
                    w={1}
                    h={1}
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
                <Txt
                  fontSize={14}
                  fontType="Bold"
                  style={{
                    textAlign: 'center',
                    width: 'auto',
                    color: theme.text,
                    paddingTop: '2%',
                  }}>
                  Data Diri
                </Txt>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    paddingHorizontal: '2%',
                    paddingVertical: '3%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: '2%',
                    }}>
                    <Txt
                      fontSize={12}
                      style={{
                        textAlign: 'center',
                        width: 'auto',
                        color: theme.text,
                      }}>
                      Nama :
                    </Txt>
                    <Txt
                      fontSize={12}
                      style={{
                        textAlign: 'center',
                        width: 'auto',
                        color: theme.text,
                      }}>
                      {'  '}
                      {userProfile?.data?.fullname}
                    </Txt>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: '2%',
                    }}>
                    <Txt
                      fontSize={12}
                      style={{
                        textAlign: 'center',
                        width: 'auto',
                        color: theme.text,
                      }}>
                      Email :
                    </Txt>
                    <Txt
                      fontSize={12}
                      style={{
                        textAlign: 'center',
                        width: 'auto',
                        color: theme.text,
                      }}>
                      {'   '}
                      {userProfile?.data?.email}
                    </Txt>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: '2%',
                    }}>
                    <Txt
                      fontSize={12}
                      style={{
                        textAlign: 'center',
                        width: 'auto',
                        color: theme.text,
                      }}>
                      Status Pekerja :
                    </Txt>
                    {userProfile?.data?.status === true ? (
                      <View
                        style={{
                          width: 'auto',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                          backgroundColor: '#49B4F8',
                          height: 'auto',
                          paddingVertical: '1%',
                          paddingHorizontal: '2%',
                          marginLeft: '2%',
                        }}>
                        <Txt
                          fontSize={11}
                          fontType="Bold"
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: '#FFF',
                          }}>
                          Aktif
                        </Txt>
                      </View>
                    ) : (
                      <View
                        style={{
                          width: 'auto',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 10,
                          backgroundColor: '#fb380e',
                          height: 'auto',
                          paddingVertical: '1%',
                          paddingHorizontal: '2%',
                          marginLeft: '2%',
                        }}>
                        <Txt
                          fontSize={11}
                          fontType="Bold"
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: '#FFF',
                          }}>
                          Tidak Aktif
                        </Txt>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              {/* END CARD */}
              {/* FORM */}
              {getFormbyId?.status === 404 ? (
                <>
                  <View
                    style={{
                      width: imageWidth * 1.1,
                      alignItems: 'center',
                      paddingHorizontal: '2%',
                      paddingVertical: '5%',
                      backgroundColor: '#49B4F8',
                      borderRadius: 10,
                      marginTop: '5%',
                      opacity: 0.3,
                    }}>
                    <View>
                      <Txt
                        fontSize={13}
                        fontType="SemiBold"
                        style={{
                          textAlign: 'center',
                          width: 'auto',
                          color: theme.text,
                        }}>
                        Kamu Belum Form Pegawai.
                      </Txt>

                      <Txt
                        fontSize={12}
                        style={{
                          textAlign: 'left',
                          width: 'auto',
                          color: theme.text,
                          paddingTop: '2%',
                        }}>
                        Harap segera melakukan pengisian form pegawai untuk
                        melengkapi data diri anda sebagai data pegawai
                        perusahaan.
                      </Txt>

                      <Txt
                        fontSize={12}
                        style={{
                          textAlign: 'left',
                          width: 'auto',
                          color: theme.text,
                          paddingTop: '2%',
                        }}>
                        Mohon lakukan pengisian data pegawai dengan melakukan
                        aksi kepada tombol Isi Form di bawah ini.
                      </Txt>

                      <View
                        style={{
                          width: '100%',
                          alignItems: 'center',
                          paddingTop: '10%',
                        }}>
                        <TouchableOpacity
                          onPress={() => navigation.navigate('isiFormPegawai')}>
                          <Gambar
                            sourceImage={require('../../assets/images/addfile.png')}
                            w={1}
                            h={0.9}
                            style={{
                              alignSelf: 'center',
                              justifyContent: 'center',
                            }}
                          />
                          <Txt
                            fontSize={12}
                            fontType="Bold"
                            style={{
                              textAlign: 'center',
                              width: 'auto',
                              color: theme.text,
                              paddingTop: '2%',
                            }}>
                            Isi Form Pegawai
                          </Txt>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View
                    style={{
                      width: imageWidth * 1.1,
                      alignItems: 'center',
                      paddingHorizontal: '2%',
                      paddingVertical: '5%',
                      backgroundColor: theme.subBackground,
                      borderRadius: 10,
                      marginTop: '5%',
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        paddingHorizontal: '2%',
                        flexDirection: 'row',
                      }}>
                      <BTN
                        onPress={() => navigation.navigate('lihatForm')}
                        style={{
                          width: '20%',
                          backgroundColor: '#0375BC',
                          paddingVertical: '2%',
                          opacity: 0.9,
                          alignContent: 'center',
                          justifyContent: 'center',
                        }}>
                        <Txt
                          fontSize={10}
                          fontType="SemiBold"
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: '#FFF',
                            // paddingTop: '2%',
                          }}>
                          Lihat
                        </Txt>
                      </BTN>
                      <BTN
                        onPress={() => navigation.navigate('editFormPegawai')}
                        style={{
                          width: '20%',
                          backgroundColor: '#fb380e',
                          paddingVertical: '2%',
                          opacity: 0.9,
                          alignContent: 'center',
                          justifyContent: 'center',
                          marginLeft: '2%',
                        }}>
                        <Txt
                          fontSize={10}
                          fontType="SemiBold"
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: '#FFF',
                            // paddingTop: '2%',
                          }}>
                          Edit
                        </Txt>
                      </BTN>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        width: '100%',
                        paddingHorizontal: '2%',
                        paddingVertical: '3%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingTop: '2%',
                        }}>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          Posisi di Lamar :
                        </Txt>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          {'  '}
                          {getFormbyId?.data?.position_applied}
                        </Txt>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingTop: '2%',
                        }}>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          Tempat Lahir :
                        </Txt>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          {'  '}
                          {getFormbyId?.data?.place_of_birth}
                        </Txt>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingTop: '2%',
                        }}>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          Tanggal Lahir :
                        </Txt>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          {'  '}
                          {formatDate(getFormbyId?.data?.date_of_birth)}
                        </Txt>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingTop: '2%',
                        }}>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          Jenis Kelamin :
                        </Txt>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          {'  '}
                          {getFormbyId?.data?.gender}
                        </Txt>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingTop: '2%',
                        }}>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          Agama :
                        </Txt>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          {'  '}
                          {getFormbyId?.data?.religion}
                        </Txt>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingTop: '2%',
                        }}>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          Golongan Darah :
                        </Txt>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          {'  '}
                          {getFormbyId?.data?.blood_type}
                        </Txt>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingTop: '2%',
                        }}>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          Status :
                        </Txt>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          {'  '}
                          {getFormbyId?.data?.marital_status}
                        </Txt>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingTop: '2%',
                        }}>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          Alamat :
                        </Txt>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          {'  '}
                          {getFormbyId?.data?.address_current}
                        </Txt>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingTop: '2%',
                        }}>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          No. Handphone :
                        </Txt>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          {'  '}
                          {getFormbyId?.data?.phone_number}
                        </Txt>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingTop: '2%',
                        }}>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          Pendidikan Terakhir :
                        </Txt>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          {'  '}
                          {getFormbyId?.data?.education_details[0].jenjang}{' '}
                          {getFormbyId?.data?.education_details[0].jurusan}
                        </Txt>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingTop: '2%',
                        }}>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          Nama Institusi :
                        </Txt>
                        <Txt
                          fontSize={12}
                          style={{
                            textAlign: 'center',
                            width: 'auto',
                            color: theme.text,
                          }}>
                          {'  '}
                          {getFormbyId?.data?.education_details[0].institusi}
                        </Txt>
                      </View>
                    </View>
                  </View>
                </>
              )}
              {/* END Form */}
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  paddingTop: '12%',
                }}>
                <BTN
                  onPress={handleLogout}
                  style={{
                    width: '100%',
                    backgroundColor: '#fb380e',
                    paddingVertical: '3%',
                    opacity: 0.9,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}>
                  <Txt
                    fontSize={13}
                    fontType="SemiBold"
                    style={{
                      textAlign: 'center',
                      width: 'auto',
                      color: '#FFF',
                      // paddingTop: '2%',
                    }}>
                    Keluar
                  </Txt>
                </BTN>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </Container>
  );
};

export default HomeScreenUser;
