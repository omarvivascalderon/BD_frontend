import axios from 'axios';
import { createInstance } from "./api"
import { redirectLogin } from "../helpers/RedirectLogin";

export const loginUs$ = async (usuario) => {
    try {
        const axiosInstance = await createInstance();
        const response = await axiosInstance.post(`http://localhost:8080/api/authentication/login/`, usuario)
        return response.data;
    } catch (error) {
        redirectLogin(error);
        alert(JSON.stringify(error.message))
    }
}

export const buscar$ = async () => {
    try {
        const axiosInstance = await createInstance();
        const response = await axiosInstance.get(`/api/usuario/buscar/`)
        return response.data;
    } catch (error) {
        redirectLogin(error);
        alert(JSON.stringify(error.message))
    }
}

export const crear$ = async (usuario) => {
    try {
        const axiosInstance = await createInstance();
        const response = await axios.post("http://localhost:8080/api/authentication/register/", usuario);
        return response.data;
    } catch (error) {
        alert(JSON.stringify(error.message))
    }
}

export const actualizar$ = async (usuario) => {
    try {
        const axiosInstance = await createInstance();
        const response = await axiosInstance.put("/api/usuario/actualizar/", usuario);
        return response.data;
    } catch (error) {
        redirectLogin(error);
        alert(JSON.stringify(error.message))
    }
}

export const eliminar$ = async (id) => {
    try {
        const axiosInstance = await createInstance();
        const response = await axiosInstance.delete("/api/usuario/eliminar/" + id);
        return response.data;
    } catch (error) {
        redirectLogin(error);
        alert(JSON.stringify(error.message))
    }
}
