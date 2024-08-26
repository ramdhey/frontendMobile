import axios from 'axios';

async function FetchAPIService({
  url,
  metode = 'GET',
  header = {},
  body = null,
  token = null,
  contentType = 'application/json',
  refreshToken = null,
  timeout = 50000,
}) {
  try {
    // Setup headers
    const headers = {...header};

    if (token && token.trim() !== '') {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (contentType && metode !== 'GET') {
      headers['Content-Type'] = contentType;
    }

    if (refreshToken && refreshToken.trim() !== '') {
      headers[
        'Cookie'
      ] = `access_token=${token}; refresh_token=${refreshToken}`;
    }

    // Axios request configuration
    const axiosConfig = {
      url: url,
      method: metode,
      headers: headers,
      timeout: timeout,
    };

    if (metode === 'GET') {
      axiosConfig.params = body; // Use params for GET request
    } else {
      axiosConfig.data = body; // Use data for POST, PUT, DELETE, etc.
    }

    const response = await axios(axiosConfig);

    return response.data;
  } catch (error) {
    // Error handling
    if (error.response) {
      console.error('Server Response Error:', error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.error('No Response:', error.request);
    } else {
      console.error('Error:', error.message);
    }

    throw error;
  }
}

export default FetchAPIService;

// OLD
// import axios from 'axios';

// async function FecthAPIService({
//   url,
//   metode = 'GET',
//   header = {},
//   body = null,
//   token = null,
//   contentType = 'application/json',
//   refreshToken = null,
//   timeout = 5000,
// }) {
//   try {
//     if (token && token.trim() !== '') {
//       header['Authorization'] = `Bearer ${token}`;
//     }

//     header['Content-Type'] = contentType;

//     if (refreshToken && refreshToken.trim() !== '') {
//       header['Cookie'] = `access_token=${token}; refresh_token=${refreshToken}`;
//     }

//     const response = await axios({
//       url: url,
//       method: metode,
//       headers: header,
//       data: body,
//       timeout: timeout,
//     });

//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       // Error dari server, misalnya status 400 atau 500
//       console.error('Server Response Error:', error.response.data);
//       return error.response.data; // Mengembalikan error data ke pemanggil
//     } else if (error.request) {
//       // Permintaan dibuat tapi tidak ada respons
//       console.error('No Response:', error.request);
//     } else {
//       // Kesalahan dalam membuat permintaan
//       console.error('Error:', error.message);
//     }

//     throw error; // Lempar error untuk ditangani di pemanggil
//   }
// }

// export default FecthAPIService;
