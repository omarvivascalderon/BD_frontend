import React, { useEffect, useState } from 'react';
import { actualizar$ } from "../../services/PartidoServices";
import { useHistory } from "react-router-dom";
import MenuComponent from "../../components/MenuComponent";
import './partido.css';
import ErroresComponent from "../../components/Errores/ErroresComponent";

const GolesPartido = props => {
  const [partido, setPartido] = useState({});
  const [errores, setErrores] = useState([]);

  let history = useHistory();

  const obtenerPartido = () => {
    const { location } = props;
    setPartido(location.state)
  }

  const asignarValores = e => {
    const { name, value } = e.target;
    setPartido(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const actualizarPartido = async () => {
    if (validaciones()) {
      const res = await actualizar$(partido);
      if (res) {
        history.push("/verPartido");
      }
    }
  }

  useEffect(() => {
    obtenerPartido();
  }, []);


  const validaciones = () => {
    let errores = [];
    let validado = true;

    if (partido.golesVisitante.length == 0 || partido.golesVisitante < 0) {
      validado = false;
      errores.push("El campo goles visitante no puede ir vacío");
    }

    if (partido.golesLocal.length == 0 || partido.golesLocal < 0) {
      validado = false;
      errores.push("El campo goles local no puede ir vacío");
    }

    setErrores(errores);
    return validado;
  }

  return (
    <div>
      <MenuComponent header />
      <div className="goles">
        <p className="title">Registrar goles</p>
        <label>Equipo local</label>
        <p>{partido.localModel ? partido.localModel.nombre : ''}</p>
        <label>Equipo visitante</label>
        <p>{partido.visitanteModel ? partido.visitanteModel.nombre : ''}</p>
        <label>Usuario</label>
        <p>{partido.usuarioModel ? partido.usuarioModel.nombre : ''}</p>
        <label>Fecha</label>
        <p>{partido.fecha}</p>
        <form>
          {partido.golesVisitante != null &&
            (
              <div>
                <p>goles vistante</p>
                <input type="number" value={partido.golesVisitante} name="golesVisitante" placeholder="golesVisitante" onChange={asignarValores} />
              </div>
            )

          }

          {partido.golesLocal != null &&
            <div>
              <p>goles local</p>
              <input type="number" value={partido.golesLocal} name="golesLocal" placeholder="golesLocal" onChange={asignarValores} />
            </div>
          }
          <div>
            <button type="button" onClick={() => actualizarPartido()}>Registrar goles</button>
          </div>
        </form>
      </div>
      <ErroresComponent errores={errores} />
    </div>
  );
}

export default GolesPartido;
