import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://tz-webapi-server-app.azurewebsites.net/api',
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

export default instance;