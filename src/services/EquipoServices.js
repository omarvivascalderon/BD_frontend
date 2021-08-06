import { createInstance } from "./api"
import { redirectLogin } from "../helpers/RedirectLogin"

export const buscar$ = async () => {
    try {
        const axiosInstance = await createInstance();
        const response = await axiosInstance.get("/api/equipo/buscar/");
        return response.data;
    } catch (error) {
        redirectLogin(error);
        alert(JSON.stringify(error.message))
    }
}

export const crear$ = async (equipo) => {
    try {
        const axiosInstance = await createInstance();
        const response = await axiosInstance.post("/api/equipo/crear/", equipo);
        return response.data;
    } catch (error) {
        redirectLogin(error);
        alert(JSON.stringify(error.message))
    }
}

export const actualizar$ = async (equipo) => {
    try {
        const axiosInstance = await createInstance();
        const response = await axiosInstance.put("/api/equipo/actualizar/", equipo);
        return response.data;
    } catch (error) {
        redirectLogin(error);
        alert(JSON.stringify(error.message))
    }
}

export const eliminar$ = async (id) => {
    try {
        const axiosInstance = await createInstance();
        const response = await axiosInstance.delete("/api/equipo/eliminar/"+id);
        return response.data;
    } catch (error) {
        redirectLogin(error);
        alert(JSON.stringify(error.message))
    }
}
