import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import authState from '../../state/auth';

const LihatForm = () => {
  const {getFormbyId} = authState();

  // Destructure the data from getFormbyId response
  const {
    position_applied,
    name,
    ktp_number,
    place_of_birth,
    date_of_birth,
    gender,
    religion,
    blood_type,
    marital_status,
    address_ktp,
    address_current,
    email,
    phone_number,
    emergency_contact,
    education_details,
    training_history,
    work_experience,
    skills,
    relocation,
    expected_salary,
  } = getFormbyId.data;

  // Function to format numbers to Rupiah currency
  const formatCurrency = amount => {
    return `Rp ${parseInt(amount, 10).toLocaleString('id-ID')}`;
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}>
        {/* Logo */}
        <View
          style={{
            width: '100%',
            // alignItems: 'center',
            flex: 1,
            paddingHorizontal: '5%',
            paddingVertical: '5%',
          }}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/icons/EDII.png')} // Ganti dengan path yang benar ke file logo
              style={styles.logo}
            />
            <Text style={styles.companyInfo}>PT. EDI INDONESIA</Text>
            <Text style={styles.companyAddress}>
              Gedung Wisma SMR 10th Floor, Jl. Yos Sudarso Kav. 89, Jakarta
              14360 Indonesia
            </Text>
            <Text style={styles.companyTel}>
              TEL: +62 21 650 5829, FAX: +62 21 650 5987
            </Text>
          </View>

          <Text style={styles.title}>DATA PRIBADI PELAMAR</Text>

          {/* Posisi yang Dilamar */}
          <Text style={styles.label}>Posisi yang Dilamar</Text>
          <TextInput
            style={styles.input}
            value={position_applied}
            editable={false}
          />

          {/* Nama */}
          <Text style={styles.label}>Nama</Text>
          <TextInput style={styles.input} value={name} editable={false} />

          {/* No. KTP */}
          <Text style={styles.label}>No. KTP</Text>
          <TextInput style={styles.input} value={ktp_number} editable={false} />

          {/* Tempat, Tanggal Lahir */}
          <Text style={styles.label}>Tempat, Tanggal Lahir</Text>
          <TextInput
            style={styles.input}
            value={`${place_of_birth}, ${date_of_birth}`}
            editable={false}
          />

          {/* Jenis Kelamin */}
          <Text style={styles.label}>Jenis Kelamin</Text>
          <TextInput style={styles.input} value={gender} editable={false} />

          {/* Agama */}
          <Text style={styles.label}>Agama</Text>
          <TextInput style={styles.input} value={religion} editable={false} />

          {/* Golongan Darah */}
          <Text style={styles.label}>Golongan Darah</Text>
          <TextInput style={styles.input} value={blood_type} editable={false} />

          {/* Status */}
          <Text style={styles.label}>Status</Text>
          <TextInput
            style={styles.input}
            value={marital_status}
            editable={false}
          />

          {/* Alamat KTP */}
          <Text style={styles.label}>Alamat KTP</Text>
          <TextInput
            style={styles.input}
            value={address_ktp}
            editable={false}
          />

          {/* Alamat Tinggal */}
          <Text style={styles.label}>Alamat Tinggal</Text>
          <TextInput
            style={styles.input}
            value={address_current}
            editable={false}
          />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} editable={false} />

          {/* No. Telp */}
          <Text style={styles.label}>No. Telp</Text>
          <TextInput
            style={styles.input}
            value={phone_number}
            editable={false}
          />

          {/* Orang Terdekat yang Dapat Dihubungi */}
          <Text style={styles.label}>Orang Terdekat yang Dapat Dihubungi</Text>
          <TextInput
            style={styles.input}
            value={emergency_contact}
            editable={false}
          />

          {/* Pendidikan Terakhir */}
          <Text style={styles.label}>Pendidikan Terakhir</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <Text style={styles.tableHeader}>Jenjang Pendidikan</Text>
              <Text style={styles.tableHeader}>Nama Institusi Akademik</Text>
              <Text style={styles.tableHeader}>Jurusan</Text>
              <Text style={styles.tableHeader}>Tahun Lulus</Text>
              <Text style={styles.tableHeader}>IPK</Text>
            </View>
            {education_details.map((edu, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{edu.jenjang}</Text>
                <Text style={styles.tableCell}>{edu.institusi}</Text>
                <Text style={styles.tableCell}>{edu.jurusan}</Text>
                <Text style={styles.tableCell}>{edu.tahun_lulus}</Text>
                <Text style={styles.tableCell}>{edu.ipk}</Text>
              </View>
            ))}
          </View>

          {/* Riwayat Pelatihan */}
          <Text style={styles.label}>Riwayat Pelatihan</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <Text style={styles.tableHeader}>Nama Kursus/Seminar</Text>
              <Text style={styles.tableHeader}>Sertifikat (ada/tidak)</Text>
              <Text style={styles.tableHeader}>Tahun</Text>
            </View>
            {training_history.map((training, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{training.nama_kursus}</Text>
                <Text style={styles.tableCell}>{training.sertifikat}</Text>
                <Text style={styles.tableCell}>{training.periode_tahun}</Text>
              </View>
            ))}
          </View>

          {/* Riwayat Pekerjaan */}
          <Text style={styles.label}>Riwayat Pekerjaan</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <Text style={styles.tableHeader}>Nama Perusahaan</Text>
              <Text style={styles.tableHeader}>Posisi Terakhir</Text>
              <Text style={styles.tableHeader}>Pendapatan Terakhir</Text>
              <Text style={styles.tableHeader}>Tahun</Text>
            </View>
            {work_experience.map((work, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{work.nama_perusahaan}</Text>
                <Text style={styles.tableCell}>{work.posisi_terakhir}</Text>
                <Text style={styles.tableCell}>
                  {formatCurrency(work.pendapatan_terakhir)}
                </Text>
                <Text style={styles.tableCell}>{work.periode_tahun}</Text>
              </View>
            ))}
          </View>

          {/* Skill */}
          <Text style={styles.label}>Skill</Text>
          <TextInput
            style={styles.input}
            value={skills.join(', ')}
            editable={false}
          />

          {/* Bersedia Ditempatkan */}
          <Text style={styles.label}>
            Bersedia Ditempatkan di Seluruh Kantor Perusahaan
          </Text>
          <TextInput style={styles.input} value={relocation} editable={false} />

          {/* Penghasilan yang Diharapkan */}
          <Text style={styles.label}>Penghasilan yang Diharapkan</Text>
          <TextInput
            style={styles.input}
            value={formatCurrency(expected_salary)}
            editable={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  companyInfo: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  companyAddress: {
    fontSize: 10,
    textAlign: 'center',
  },
  companyTel: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    marginTop: 5,
  },
  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableHeaderRow: {
    backgroundColor: '#f7f7f7',
  },
  tableHeader: {
    flex: 1,
    padding: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
});

export default LihatForm;
