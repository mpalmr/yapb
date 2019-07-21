import axios from 'axios';


const client = axios.create({ baseURL: 'http://localhost:3000/api' });

client.interceptors.response.use(res => res.data);


export default client;
