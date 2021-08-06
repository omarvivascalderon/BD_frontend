import axios from 'axios';
import { getSesionXItem } from "../helpers/LocalStorage";
const token = getSesionXItem("token");

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 1000,
    headers: { 'Authorization': 'Bearer ' + token }
});
export default instance;