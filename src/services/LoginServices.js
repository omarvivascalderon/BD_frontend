import axios from 'axios';

export const Login$ = async (usuario) => {
    try {
        const response = await axios.post("http://localhost:8080/api/authentication/authenticate", usuario);
        return response.data;
    } catch (error) {
        alert(JSON.stringify(error.message))
    }
}
