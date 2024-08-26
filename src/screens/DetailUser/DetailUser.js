import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Dimensions, useColorScheme, View} from 'react-native';
import FecthAPIService from '../../services/API/FecthAPIService';
import {API_BASE_URL} from '@env';
import authState from '../../state/auth';
import Container from '../../components/Container/Container';
import HeadersHome from '../../navigation/Headers/HeadersHome';
import HeaderApp from '../../navigation/Headers/HeaderApp';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';
import Txt from '../../components/Txt/Txt';
import BTN from '../../components/BTN/BTN';

const DetailUser = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.85; // 85% dari lebar layar
  const imageHeight = imageWidth * (115 / screenWidth);
  const route = useRoute();
  const {itemId} = route.params;
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  console.log({itemId});
  const {
    token,
    setToken,
    userProfile,
    setuserProfile,
    setAvatar,
    Avatar,
    role,
    setRole,
    getbyId,
    getFormbyId,
    setgetFormbyID,
  } = authState();

  console.log(JSON.stringify(getFormbyId));

  const fecthByID = useCallback(async () => {
    const url = `${API_BASE_URL}/admin/application/user/${itemId}`;
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
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      fecthByID();
    }, [fecthByID]),
  );
  return (
    <Container useView={true} translucent={true}>
      <HeaderApp title="Detail User" />
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          // justifyContent: 'center',
          flex: 1,
          backgroundColor: theme.background,
        }}>
        <View
          style={{
            width: imageWidth * 1.1,
            alignItems: 'center',
            paddingHorizontal: '2%',
            paddingVertical: '5%',
            backgroundColor: theme.subBackground,
            borderRadius: 10,
            marginTop: '10%',
          }}>
          <Txt
            fontSize={13}
            fontType="SemiBold"
            style={{
              textAlign: 'center',
              width: 'auto',
              color: theme.text,
            }}>
            Data Diri Pegawai.
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
                {getFormbyId?.data?.name}
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
                Posisi di lamar :
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
                Tempat tanggal lahir :
              </Txt>
              <Txt
                fontSize={12}
                style={{
                  textAlign: 'center',
                  width: 'auto',
                  color: theme.text,
                }}>
                {'  '}
                {getFormbyId?.data?.place_of_birth},{' '}
                {getFormbyId?.data?.date_of_birth}
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

            <View style={{paddingTop: 10}}>
              <Txt
                style={{fontSize: 16, color: theme.text, fontWeight: 'bold'}}>
                Riwayat Pendidikan
              </Txt>
              {getFormbyId?.data?.education_details.map((education, index) => (
                <View key={index} style={{marginTop: 5}}>
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
                      Institution :
                    </Txt>
                    <Txt
                      fontSize={12}
                      style={{
                        textAlign: 'center',
                        width: 'auto',
                        color: theme.text,
                      }}>
                      {'  '}
                      {education.institusi}
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
                      Major :
                    </Txt>
                    <Txt
                      fontSize={12}
                      style={{
                        textAlign: 'center',
                        width: 'auto',
                        color: theme.text,
                      }}>
                      {'  '}
                      {education.jurusan}
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
                      GPA :
                    </Txt>
                    <Txt
                      fontSize={12}
                      style={{
                        textAlign: 'center',
                        width: 'auto',
                        color: theme.text,
                      }}>
                      {'  '}
                      {education.ipk}
                    </Txt>
                  </View>
                </View>
              ))}
            </View>
            <View
              style={{
                wdith: '100%',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                paddingHorizontal: '3%',
              }}>
              <BTN
                onPress={() =>
                  navigation.navigate('editFormPegawaiFromAdmin', {
                    itemId: getFormbyId?.data?.id,
                  })
                }
                style={{
                  width: '30%',
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
                  Edit
                </Txt>
              </BTN>
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default DetailUser;
