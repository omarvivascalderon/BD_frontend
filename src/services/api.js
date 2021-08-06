import axios from 'axios'
import { getSesionXItem } from "../helpers/LocalStorage";

export async function createInstance(){
    const token = await getSesionXItem("token")
    const BASE_URL = 'http://localhost:8080';
    const bearer = `Bearer ${token ? token.token : ""}`;
    const axiosInstance = axios.create();
    axiosInstance.defaults.baseURL = BASE_URL;
    axiosInstance.defaults.headers.common["Authorization"] = bearer;
    return axiosInstance;
}