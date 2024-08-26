import axios from 'axios';

async function ServiceAPI({
  url,
  metode = 'GET',
  header = {},
  body = null,
  token = null,
  contentType = 'application/json',
  refreshToken = null,
  timeout = 5000,
}) {
  try {
    if (token && token.trim() !== '') {
      header['Authorization'] = `Bearer ${token}`;
    }

    header['Content-Type'] = contentType;

    if (refreshToken && refreshToken.trim() !== '') {
      header['Cookie'] = `access_token=${token}; refresh_token=${refreshToken}`;
    }

    const response = await axios({
      url: url,
      method: metode,
      headers: header,
      data: body,
      timeout: timeout,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // Error dari server, misalnya status 400 atau 500
      console.error('Server Response Error:', error.response.data);
      return error.response.data; // Mengembalikan error data ke pemanggil
    } else if (error.request) {
      // Permintaan dibuat tapi tidak ada respons
      console.error('No Response:', error.request);
    } else {
      // Kesalahan dalam membuat permintaan
      console.error('Error:', error.message);
    }

    throw error; // Lempar error untuk ditangani di pemanggil
  }
}

export default ServiceAPI;
