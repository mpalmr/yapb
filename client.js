import axios from 'axios';


const client = axios.create({ baseURL: '/api' });

client.interceptors.response.use(res => res.data);


export default client;
