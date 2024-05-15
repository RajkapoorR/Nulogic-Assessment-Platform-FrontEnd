import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:8080/v1',
  timeout: 5000,
});

export default Axios;
