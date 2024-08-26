import React, {useEffect, useState} from 'react';
import {ScrollView, useColorScheme, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Container from '../../components/Container/Container';
import HeaderApp from '../../navigation/Headers/HeaderApp';
import {useNavigation, useRoute} from '@react-navigation/native';
import {darkTheme} from '../../config/themes/Dark';
import {lightTheme} from '../../config/themes/Light';
import InputText from '../../components/InputText/InputText';
import Txt from '../../components/Txt/Txt';
import InputDate from '../../components/InputDate/InputDate';
import PickerCustom from '../../components/PickerSelect/PickerSelect';
import BTN from '../../components/BTN/BTN';
import axios from 'axios';
import {API_BASE_URL} from '@env';
import Toast from 'react-native-root-toast';
import authState from '../../state/auth';
import FecthAPIService from '../../services/API/FecthAPIService';
import SuccessToast from '../../components/SuccessToast/SuccessToast';

const EditFormPegawaiFromAdmin = () => {
  const route = useRoute();
  const {itemId} = route.params;
  const {
    token,
    setToken,
    userProfile,
    setuserProfile,
    setAvatar,
    Avatar,
    role,
    setRole,
    getFormbyId,
  } = authState();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [ktpNumber, setKtpNumber] = useState('');
  const [religion, setReligion] = useState('');
  const [addressKtp, setAddressKtp] = useState('');
  const [addressCurrent, setAddressCurrent] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [skills, setSkills] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState(new Date());
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [golonganDarah, setGolonganDarah] = useState('');
  const [status, setStatus] = useState('');
  const [posisiDilamar, setPosisiDilamar] = useState('');
  const [jenjangPendidikan, setJenjangPendidikan] = useState('');
  const [sertifikat, setSertifikat] = useState('');
  const [bersediaDitempatkan, setBersediaDitempatkan] = useState('');
  console.log({tanggalLahir});
  const [educationFields, setEducationFields] = useState([]);
  const [courseFields, setCourseFields] = useState([]);
  const [experienceFields, setExperienceFields] = useState([]);
  useEffect(() => {
    if (getFormbyId?.data) {
      const {
        name,
        place_of_birth,
        ktp_number,
        religion,
        address_ktp,
        address_current,
        email,
        phone_number,
        emergency_contact,
        expected_salary,
        skills,
        date_of_birth,
        gender,
        blood_type,
        marital_status,
        position_applied,
        relocation,
        education_details,
        training_history,
        work_experience,
      } = getFormbyId.data;

      setName(name);
      setPlaceOfBirth(place_of_birth);
      setKtpNumber(ktp_number);
      setReligion(religion);
      setAddressKtp(address_ktp);
      setAddressCurrent(address_current);
      setEmail(email);
      setPhoneNumber(phone_number);
      setEmergencyContact(emergency_contact);
      setExpectedSalary(expected_salary);
      setSkills(skills.join(', '));
      setTanggalLahir(new Date(date_of_birth));
      setJenisKelamin(gender);
      setGolonganDarah(blood_type);
      setStatus(marital_status);
      setPosisiDilamar(position_applied);
      setBersediaDitempatkan(relocation);
      setEducationFields(education_details || []);
      setCourseFields(training_history || []);
      setExperienceFields(work_experience || []);
    }
  }, [getFormbyId]);

  const addEducationField = () => {
    setEducationFields([
      ...educationFields,
      {
        jenjangPendidikan: '',
        institusi: '',
        jurusan: '',
        tahunLulus: '',
        ipk: '',
      },
    ]);
  };

  const addCourseField = () => {
    setCourseFields([
      ...courseFields,
      {
        namaKursus: '',
        sertifikat: '',
        periodeTahun: '',
      },
    ]);
  };

  const addExperienceField = () => {
    setExperienceFields([
      ...experienceFields,
      {
        namaPerusahaan: '',
        posisiTerakhir: '',
        pendapatTerakhir: '',
        periodeTahun: '',
      },
    ]);
  };

  const removeEducationField = index => {
    const newFields = [...educationFields];
    newFields.splice(index, 1);
    setEducationFields(newFields);
  };
  const removeCourseField = index => {
    const newFields = [...courseFields];
    newFields.splice(index, 1);
    setCourseFields(newFields);
  };
  const removeExperienceField = index => {
    const newFields = [...experienceFields];
    newFields.splice(index, 1);
    setExperienceFields(newFields);
  };

  const handleEducationChange = (index, field, value) => {
    const newFields = [...educationFields];
    newFields[index][field] = value;
    setEducationFields(newFields);
  };

  const handleCourseChange = (index, field, value) => {
    const newFields = [...courseFields];
    newFields[index][field] = value;
    setCourseFields(newFields);
  };

  const handleExperienceChange = (index, field, value) => {
    const newFields = [...experienceFields];
    newFields[index][field] = value;
    setExperienceFields(newFields);
  };

  const handleSubmit = async () => {
    const payload = {
      position_applied: posisiDilamar,
      name,
      ktp_number: ktpNumber,
      place_of_birth: placeOfBirth,
      date_of_birth: tanggalLahir,
      gender: jenisKelamin,
      religion,
      blood_type: golonganDarah,
      marital_status: status,
      address_ktp: addressKtp,
      address_current: addressCurrent,
      email,
      phone_number: phoneNumber,
      emergency_contact: emergencyContact,
      education_details: educationFields.map(education => ({
        jenjang: education.jenjangPendidikan,
        institusi: education.institusi,
        jurusan: education.jurusan,
        tahun_lulus: education.tahunLulus,
        ipk: education.ipk,
      })),
      training_history: courseFields.map(course => ({
        nama_kursus: course.namaKursus,
        sertifikat: course.sertifikat,
        periode_tahun: course.periodeTahun,
      })),
      work_experience: experienceFields.map(exprience => ({
        nama_perusahaan: exprience.namaPerusahaan,
        posisi_terakhir: exprience.posisiTerakhir,
        pendapatan_terakhir: exprience.pendapatTerakhir,
        periode_tahun: exprience.periodeTahun,
      })),
      skills: skills.split(',').map(skill => skill.trim()),
      relocation: bersediaDitempatkan,
      expected_salary: expectedSalary,
    };
    console.log(JSON.stringify(payload));
    try {
      const responseData = await FecthAPIService({
        url: `${API_BASE_URL}/admin/application/edit/${itemId}`,
        metode: 'PUT',
        token: token,
        body: payload,
      });
      const Success = SuccessToast({
        title: `Data Berhasil diubah`,
        duration: Toast.durations.LONG,
      });
      Success.showToast();
      console.log('Response:', responseData);
      navigation.navigate('homeAdmin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1}}
      resetScrollToCoords={null}
      contentContainerStyle={{flexGrow: 1}}
      scrollEnabled={true} // you can experiment with this option - it's optional
    >
      <Container useView={true} translucent={true}>
        <HeaderApp title="Form Pegawai" />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            flex: 1,
            backgroundColor: theme.background,
          }}>
          {/*  */}
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Nama Lengkap
              </Txt>
            </View>
            <InputText
              value={name}
              onChangeText={setName}
              color={theme.text}
              placeholder={'Masukkan Nama Lengkap'}
              placeholderTextColor={theme.text}
              keyboardType="default"
            />
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  width: '50%',
                  alignSelf: 'flex-start',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingHorizontal: '1%',
                  paddingVertical: '3%',
                }}>
                <Txt
                  fontSize={11}
                  style={{
                    textAlign: 'left',
                    width: 'auto',
                    color: theme.text,
                    marginBottom: '5%',
                  }}>
                  Tempat
                </Txt>
                <InputText
                  color={theme.text}
                  placeholder="Masukkan Tempat Lahir"
                  placeholderTextColor={theme.text}
                  keyboardType="default"
                  value={placeOfBirth}
                  onChangeText={setPlaceOfBirth}
                />
              </View>

              <View
                style={{
                  width: '50%',
                  alignSelf: 'flex-start',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingHorizontal: '1%',
                  paddingVertical: '3%',
                }}>
                <Txt
                  fontSize={11}
                  style={{
                    textAlign: 'left',
                    width: 'auto',
                    color: theme.text,
                    marginBottom: '5%',
                  }}>
                  Tanggal Lahir
                </Txt>
                <InputDate
                  value={tanggalLahir}
                  onChangeDate={setTanggalLahir}
                  placeholderTextColor={theme.text}
                  colorText={theme.text}
                  borderColor={theme.text}
                  backgroundColor={theme.background}
                  colorTxt={theme.text}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                NIK
              </Txt>
            </View>
            <InputText
              color={theme.text}
              placeholder="Masukkan NIK"
              placeholderTextColor={theme.text}
              keyboardType="numeric"
              value={ktpNumber}
              onChangeText={setKtpNumber}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Posisi di Lamar
              </Txt>
            </View>
            <PickerCustom
              selectedValue={posisiDilamar}
              onValueChange={setPosisiDilamar}
              items={[
                {label: 'Mobile Developer', value: 'Mobile Developer'},
                {label: 'Software Engineer', value: 'Software Engineer'},
                {label: 'Dev Ops', value: 'DevOps'},
                {label: 'Full Stack', value: 'FullStack'},
                {label: 'Project Manager', value: 'Project Manager'},
                {label: 'Web Developer', value: 'Web Developer'},
              ]}
              borderColor={theme.text}
              backgroundColor={theme.background}
              colorTxt={theme.text}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Jenis Kelamin
              </Txt>
            </View>
            <PickerCustom
              selectedValue={jenisKelamin}
              onValueChange={setJenisKelamin}
              items={[
                {label: 'Laki-laki', value: 'male'},
                {label: 'Perempuan', value: 'female'},
              ]}
              borderColor={theme.text}
              backgroundColor={theme.background}
              colorTxt={theme.text}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Agama
              </Txt>
            </View>
            <InputText
              color={theme.text}
              placeholder={'Masukkan Agama'}
              placeholderTextColor={theme.text}
              keyboardType="default"
              value={religion}
              onChangeText={setReligion}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Golongan Darah
              </Txt>
            </View>
            <PickerCustom
              selectedValue={golonganDarah}
              onValueChange={setGolonganDarah}
              items={[
                {label: 'A', value: 'A'},
                {label: 'B', value: 'B'},
                {label: 'AB', value: 'AB'},
                {label: 'O', value: 'O'},
              ]}
              borderColor={theme.text}
              backgroundColor={theme.background}
              colorTxt={theme.text}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Status
              </Txt>
            </View>
            <PickerCustom
              selectedValue={status}
              onValueChange={setStatus}
              items={[
                {label: 'Single', value: 'Single'},
                {label: 'Menikah', value: 'Menikah'},
                {label: 'Duda', value: 'Duda'},
                {label: 'Janda', value: 'Janda'},
              ]}
              borderColor={theme.text}
              backgroundColor={theme.background}
              colorTxt={theme.text}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Alamat di KTP
              </Txt>
            </View>
            <InputText
              color={theme.text}
              placeholder={'Masukkan Alamat KTP'}
              placeholderTextColor={theme.text}
              keyboardType="default"
              value={addressKtp}
              onChangeText={setAddressKtp}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Alamat saat ini
              </Txt>
            </View>
            <InputText
              color={theme.text}
              placeholder={'Masukkan Alamat saat ini'}
              placeholderTextColor={theme.text}
              keyboardType="default"
              value={addressCurrent}
              onChangeText={setAddressCurrent}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Email
              </Txt>
            </View>
            <InputText
              color={theme.text}
              placeholder="Masukkan Email"
              placeholderTextColor={theme.text}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Nomor Handphone
              </Txt>
            </View>
            <InputText
              color={theme.text}
              placeholder={'Masukkan Nomor Handphone'}
              placeholderTextColor={theme.text}
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Kontak Darurat
              </Txt>
            </View>
            <InputText
              color={theme.text}
              placeholder={'Masukkan Kontak Darurat'}
              placeholderTextColor={theme.text}
              keyboardType="default"
              value={emergencyContact}
              onChangeText={setEmergencyContact}
            />
          </View>
          {/*  */}
          {educationFields.map((education, index) => (
            <>
              <View
                key={index}
                style={{
                  width: '90%',
                  alignItems: 'flex-start',
                  paddingTop: '1%',
                  alignSelf: 'flex-start',
                  paddingHorizontal: '3%',
                  paddingTop: '5%',
                }}>
                <Txt
                  fontSize={13}
                  fontType="Bold"
                  style={{
                    textAlign: 'left',
                    width: 'auto',
                    color: theme.text,
                  }}>
                  Pendidikan
                </Txt>
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  paddingTop: '1%',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingHorizontal: '3%',
                    paddingVertical: '3%',
                  }}>
                  <Txt
                    fontSize={11}
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    Jenjang Pendidikan
                  </Txt>
                </View>
                <PickerCustom
                  selectedValue={education.jenjangPendidikan}
                  onValueChange={itemValue =>
                    handleEducationChange(index, 'jenjangPendidikan', itemValue)
                  }
                  items={[
                    {label: 'S3', value: 'S3'},
                    {label: 'S2', value: 'S2'},
                    {label: 'S1', value: 'S1'},
                    {label: 'SMA', value: 'SMA'},
                    {label: 'SMP', value: 'SMP'},
                    {label: 'SD', value: 'SD'},
                  ]}
                  borderColor={theme.text}
                  backgroundColor={theme.background}
                  colorTxt={theme.text}
                />
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  paddingTop: '1%',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingHorizontal: '3%',
                    paddingVertical: '3%',
                  }}>
                  <Txt
                    fontSize={11}
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    Institusi
                  </Txt>
                </View>
                <InputText
                  color={theme.text}
                  placeholder={'Masukkan Institusi'}
                  placeholderTextColor={theme.text}
                  keyboardType="default"
                  value={education.institusi}
                  onChangeText={text =>
                    handleEducationChange(index, 'institusi', text)
                  }
                />
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  paddingTop: '1%',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingHorizontal: '3%',
                    paddingVertical: '3%',
                  }}>
                  <Txt
                    fontSize={11}
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    Jurusan
                  </Txt>
                </View>
                <InputText
                  color={theme.text}
                  placeholder={'Masukkan Jurusan'}
                  placeholderTextColor={theme.text}
                  keyboardType="default"
                  value={education.jurusan}
                  onChangeText={text =>
                    handleEducationChange(index, 'jurusan', text)
                  }
                />
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  paddingTop: '1%',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingHorizontal: '3%',
                    paddingVertical: '3%',
                  }}>
                  <Txt
                    fontSize={11}
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    Tahun Lulus
                  </Txt>
                </View>
                <InputText
                  color={theme.text}
                  placeholder={'Masukkan Tahun Lulus'}
                  placeholderTextColor={theme.text}
                  keyboardType="default"
                  value={education.tahunLulus}
                  onChangeText={text =>
                    handleEducationChange(index, 'tahunLulus', text)
                  }
                />
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  paddingTop: '1%',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingHorizontal: '3%',
                    paddingVertical: '3%',
                  }}>
                  <Txt
                    fontSize={11}
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    IPK
                  </Txt>
                </View>
                <InputText
                  color={theme.text}
                  placeholder={'Masukkan IPK'}
                  placeholderTextColor={theme.text}
                  keyboardType="default"
                  value={education.ipk}
                  onChangeText={text =>
                    handleEducationChange(index, 'ipk', text)
                  }
                />
              </View>
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  paddingTop: '5%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {index > 0 && (
                  <BTN
                    onPress={() => removeEducationField(index)}
                    style={{
                      width: '30%',
                      backgroundColor: '#1C8DDF',
                      paddingVertical: '2%',
                      opacity: 0.9,
                      // marginTop: 10,
                      marginRight: '2%',
                    }}>
                    <Txt
                      fontSize={12}
                      fontType="Bold"
                      style={{
                        textAlign: 'left',
                        width: 'auto',
                        color: '#FFFF',
                      }}>
                      Hapus
                    </Txt>
                  </BTN>
                )}
                <BTN
                  onPress={addEducationField}
                  style={{
                    width: index > 0 ? '45%' : '90%',
                    backgroundColor: '#1C8DDF',
                    paddingVertical: '2%',
                    opacity: 0.9,
                  }}>
                  <Txt
                    fontSize={index > 0 ? 10 : 12}
                    fontType="Bold"
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: '#FFFF',
                    }}>
                    {educationFields.length > 1
                      ? 'Tambah Pendidikan Lain'
                      : 'Tambah Pendidikan'}
                  </Txt>
                </BTN>
              </View>
            </>
          ))}
          {courseFields.map((course, index) => (
            <>
              <View
                key={index}
                style={{
                  width: '90%',

                  paddingTop: '1%',
                  alignSelf: 'flex-start',
                  paddingHorizontal: '3%',
                  paddingTop: '5%',
                  alignItems: 'flex-start',
                }}>
                <Txt
                  fontSize={13}
                  fontType="Bold"
                  style={{
                    textAlign: 'left',
                    width: 'auto',
                    color: theme.text,
                  }}>
                  Pelatihan
                </Txt>
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  paddingTop: '1%',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingHorizontal: '3%',
                    paddingVertical: '3%',
                  }}>
                  <Txt
                    fontSize={11}
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    Nama Kursus
                  </Txt>
                </View>
                <InputText
                  color={theme.text}
                  placeholder={'Masukkan Nama Lengkap'}
                  placeholderTextColor={theme.text}
                  keyboardType="default"
                  value={course?.namaKursus}
                  onChangeText={text =>
                    handleCourseChange(index, 'namaKursus', text)
                  }
                />
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  paddingTop: '1%',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingHorizontal: '3%',
                    paddingVertical: '3%',
                  }}>
                  <Txt
                    fontSize={11}
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    Sertifikat
                  </Txt>
                </View>
                <PickerCustom
                  selectedValue={course.sertifikat}
                  onValueChange={itemValue =>
                    handleCourseChange(index, 'sertifikat', itemValue)
                  }
                  items={[
                    {label: 'Ada', value: 'ada'},
                    {label: 'Tidak Ada', value: 'tidak ada'},
                  ]}
                  borderColor={theme.text}
                  backgroundColor={theme.background}
                  colorTxt={theme.text}
                />
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  paddingTop: '1%',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingHorizontal: '3%',
                    paddingVertical: '3%',
                  }}>
                  <Txt
                    fontSize={11}
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    Periode Tahun
                  </Txt>
                </View>
                <InputText
                  color={theme.text}
                  placeholder={'Masukkan Nama Lengkap'}
                  placeholderTextColor={theme.text}
                  keyboardType="default"
                  value={course?.periodeTahun}
                  onChangeText={text =>
                    handleCourseChange(index, 'periodeTahun', text)
                  }
                />
              </View>
              <View
                style={{
                  width: '100%',
                  alignSelf: 'flex-start',
                  paddingTop: '5%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {index > 0 && (
                  <BTN
                    onPress={() => removeCourseField(index)}
                    style={{
                      width: '30%',
                      backgroundColor: '#1C8DDF',
                      paddingVertical: '2%',
                      opacity: 0.9,
                      // marginTop: 10,
                      marginRight: '2%',
                    }}>
                    <Txt
                      fontSize={12}
                      fontType="Bold"
                      style={{
                        textAlign: 'left',
                        width: 'auto',
                        color: '#FFFF',
                      }}>
                      Hapus
                    </Txt>
                  </BTN>
                )}
                <BTN
                  onPress={addCourseField}
                  style={{
                    width: index > 0 ? '45%' : '90%',
                    backgroundColor: '#1C8DDF',
                    paddingVertical: '2%',
                    opacity: 0.9,
                  }}>
                  <Txt
                    fontSize={index > 0 ? 10 : 12}
                    fontType="Bold"
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: '#FFFF',
                    }}>
                    {courseFields.length > 1
                      ? 'Tambah Kursus Lain'
                      : 'Tambah Kursus'}
                  </Txt>
                </BTN>
              </View>
            </>
          ))}
          {/*  */}
          {experienceFields.map((exprience, index) => (
            <>
              <View
                key={index}
                style={{
                  width: '90%',
                  alignItems: 'center',
                  paddingTop: '1%',
                  alignSelf: 'flex-start',
                  paddingHorizontal: '3%',
                  paddingTop: '5%',
                  alignItems: 'flex-start',
                }}>
                <Txt
                  fontSize={13}
                  fontType="Bold"
                  style={{
                    textAlign: 'left',
                    width: 'auto',
                    color: theme.text,
                  }}>
                  Pengalaman Kerja
                </Txt>
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  paddingTop: '1%',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingHorizontal: '3%',
                    paddingVertical: '3%',
                  }}>
                  <Txt
                    fontSize={11}
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    Nama Perusahaan
                  </Txt>
                </View>
                <InputText
                  color={theme.text}
                  placeholder={'Masukkan Nama Perusahaan'}
                  placeholderTextColor={theme.text}
                  keyboardType="default"
                  value={exprience.namaPerusahaan}
                  onChangeText={text =>
                    handleExperienceChange(index, 'namaPerusahaan', text)
                  }
                />
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  paddingTop: '1%',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingHorizontal: '3%',
                    paddingVertical: '3%',
                  }}>
                  <Txt
                    fontSize={11}
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    Posisi Terakhir
                  </Txt>
                </View>
                <InputText
                  color={theme.text}
                  placeholder={'Masukkan Posisi terakhir'}
                  placeholderTextColor={theme.text}
                  keyboardType="default"
                  value={exprience.posisiTerakhir}
                  onChangeText={text =>
                    handleExperienceChange(index, 'posisiTerakhir', text)
                  }
                />
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  paddingTop: '1%',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingHorizontal: '3%',
                    paddingVertical: '3%',
                  }}>
                  <Txt
                    fontSize={11}
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    Pendapatan Terakhir
                  </Txt>
                </View>
                <InputText
                  color={theme.text}
                  placeholder={'Masukkan Pendapatan Terakhir'}
                  placeholderTextColor={theme.text}
                  keyboardType="default"
                  value={exprience.pendapatTerakhir}
                  onChangeText={text =>
                    handleExperienceChange(index, 'pendapatTerakhir', text)
                  }
                />
              </View>
              <View
                style={{
                  width: '90%',
                  alignItems: 'center',
                  paddingTop: '1%',
                }}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingHorizontal: '3%',
                    paddingVertical: '3%',
                  }}>
                  <Txt
                    fontSize={11}
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: theme.text,
                    }}>
                    Periode Tahun
                  </Txt>
                </View>
                <InputText
                  color={theme.text}
                  placeholder={'Masukkan Periode Tahun'}
                  placeholderTextColor={theme.text}
                  keyboardType="default"
                  value={exprience.periodeTahun}
                  onChangeText={text =>
                    handleExperienceChange(index, 'periodeTahun', text)
                  }
                />
              </View>
              <View
                style={{
                  width: '100%',
                  alignSelf: 'flex-start',
                  paddingTop: '5%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {index > 0 && (
                  <BTN
                    onPress={() => removeExperienceField(index)}
                    style={{
                      width: '30%',
                      backgroundColor: '#1C8DDF',
                      paddingVertical: '2%',
                      opacity: 0.9,
                      // marginTop: 10,
                      marginRight: '2%',
                    }}>
                    <Txt
                      fontSize={12}
                      fontType="Bold"
                      style={{
                        textAlign: 'left',
                        width: 'auto',
                        color: '#FFFF',
                      }}>
                      Hapus
                    </Txt>
                  </BTN>
                )}
                <BTN
                  onPress={addExperienceField}
                  style={{
                    width: index > 0 ? '45%' : '90%',
                    backgroundColor: '#1C8DDF',
                    paddingVertical: '2%',
                    opacity: 0.9,
                  }}>
                  <Txt
                    fontSize={index > 0 ? 10 : 12}
                    fontType="Bold"
                    style={{
                      textAlign: 'left',
                      width: 'auto',
                      color: '#FFFF',
                    }}>
                    {experienceFields.length > 1
                      ? 'Tambah Pengalaman Kerja Lain'
                      : 'Tambah Pengalaman Kerja'}
                  </Txt>
                </BTN>
              </View>
            </>
          ))}

          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Skills
              </Txt>
            </View>
            <InputText
              color={theme.text}
              placeholder={'Masukkan Nama Lengkap'}
              placeholderTextColor={theme.text}
              keyboardType="default"
              value={skills}
              onChangeText={setSkills}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Bersedia di tempatkan dimana pun?
              </Txt>
            </View>
            <PickerCustom
              selectedValue={bersediaDitempatkan}
              onValueChange={setBersediaDitempatkan}
              items={[
                {label: 'Ya', value: 'ya'},
                {label: 'Tidak', value: 'tidak'},
              ]}
              borderColor={theme.text}
              backgroundColor={theme.background}
              colorTxt={theme.text}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignItems: 'center',
              paddingTop: '1%',
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingHorizontal: '3%',
                paddingVertical: '3%',
              }}>
              <Txt
                fontSize={11}
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: theme.text,
                }}>
                Gaji yang di harapkan
              </Txt>
            </View>
            <InputText
              color={theme.text}
              placeholder={'Masukkan Ekspektasi Gaji'}
              placeholderTextColor={theme.text}
              keyboardType="default"
              value={expectedSalary}
              onChangeText={setExpectedSalary}
            />
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingVertical: '3%',
            }}>
            <BTN
              onPress={handleSubmit}
              style={{
                width: '90%',
                backgroundColor: '#1C8DDF',
                paddingVertical: '2%',
                opacity: 0.9,
              }}>
              <Txt
                fontSize={12}
                fontType="Bold"
                style={{
                  textAlign: 'left',
                  width: 'auto',
                  color: '#FFFF',
                }}>
                Simpan
              </Txt>
            </BTN>
          </View>
        </View>
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default EditFormPegawaiFromAdmin;
