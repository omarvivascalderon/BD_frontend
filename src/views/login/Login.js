import './Login.css';
import React, { useEffect, useState } from 'react';
import { Login$ } from "../../services/LoginServices";
import { loginUs$ } from "../../services/UsuarioServices";
import { useHistory } from "react-router-dom";
import { agregarSesionXItem, limpiarSesion } from "../../helpers/LocalStorage";
import ErroresComponent from "../../components/Errores/ErroresComponent";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState([]);

  let history = useHistory();


  const limpiarFormulario = () => {
    setUsername("");
    setPassword("");
  }

  const validaciones = () => {
    let campos = { username, password };
    let errores = [];
    let validado = true;

    if (!campos.username) {
      validado = false;
      errores.push("El campo username no puede ir vacío");
    }

    if (!campos.password) {
      validado = false;
      errores.push("El campo password no puede ir vacío");
    }

    setErrores(errores);
    return validado;
  }

  const log = async () => {
    if (validaciones()) {
      const token = await Login$({ username, password });
      if (!token) {
        alert("sin datos para el usuario");
        limpiarFormulario();
        limpiarSesion();
      } else {
        const usuario = await loginUs$({ username, password });
        await agregarSesionXItem("token", token);
        await agregarSesionXItem("usuario", usuario);
        history.push("/menu");
      }
    }
  }


  useEffect(() => {
    limpiarSesion();
  }, [])

  return (
    <div className="login-container">
      <p className="title">Bienvenido</p>
      <form>
        <div>
          <input type="text" value={username} placeholder="username" onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          <input type="password" value={password} placeholder="password" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="button" onClick={() => log()}>Ingresar</button>
      </form>
      <ErroresComponent errores={errores} />
    </div>
  );
}

export default Login;
