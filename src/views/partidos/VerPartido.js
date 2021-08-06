import React, { useEffect, useState } from 'react';
import { buscar$ } from "../../services/PartidoServices";
import { useHistory } from "react-router-dom";
import MenuComponent from "../../components/MenuComponent";

function VerPartido() {
  const [partidos, setPartidos] = useState([]);
  let history = useHistory();

  const buscarPartidos = async () => {
    setPartidos(await buscar$());
  }

  const marcarGoles = (partido) => {
    history.push({
      pathname: '/golesPartidos',
      state: partido,
    });
  }

  useEffect(() => {
    buscarPartidos();
  }, []);

  return (
    <div>
      <MenuComponent header/>
      <p className="title">Ver partidos</p>
      <table>
        <thead>
          <tr>
            <th>Local</th>
            <th>Visitante</th>
            <th>Usuario</th>
            <th>Goles local</th>
            <th>Goles vistante</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {partidos.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.localModel.nombre}</td>
                <td>{item.visitanteModel.nombre}</td>
                <td>{item.usuarioModel.nombre}</td>
                <td>{item.golesLocal}</td>
                <td>{item.golesVisitante}</td>
                <td>{item.fecha}</td>
                {item.golesLocal > 0 || item.golesVisitante > 0 ? <td>Partido registrado</td> : <td><button type="button" onClick={() => marcarGoles(item)}>Registrar goles</button></td>} 
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default VerPartido;
