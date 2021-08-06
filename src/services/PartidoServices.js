import { createInstance } from "./api"
import { redirectLogin } from "../helpers/RedirectLogin"

export const buscar$ = async () => {
    try {
        const axiosInstance = await createInstance();
        const response = await axiosInstance.get("/api/partido/buscar/");
        return response.data;
    } catch (error) {
        redirectLogin(error);
        alert(JSON.stringify(error.message))
    }
}

export const crear$ = async (partido, idUsuario) => {
    try {
        const axiosInstance = await createInstance();
        partido.usuario = idUsuario;
        const response = await axiosInstance.post("/api/partido/crear/", partido);
        return response.data;
    } catch (error) {
        redirectLogin(error);
        alert(JSON.stringify(error.message))
    }
}

export const actualizar$ = async (partido) => {
    try {
        const axiosInstance = await createInstance();
        const response = await axiosInstance.put("/api/partido/actualizar/", partido);
        return response.data;
    } catch (error) {
        redirectLogin(error);
        alert(JSON.stringify(error.message))
    }
}

export const eliminar$ = async (id) => {
    try {
        const axiosInstance = await createInstance();
        const response = await axiosInstance.delete("/api/partido/eliminar/" + id);
        return response.data;
    } catch (error) {
        redirectLogin(error);
        alert(JSON.stringify(error.message))
    }
}
