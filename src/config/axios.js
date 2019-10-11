import axios from 'axios';

//base connection to axios
const clienteAxios = axios.create({
    baseURL: 'http://localhost:4000'
});

export default clienteAxios;