import './Equipo.css';
import React, { useEffect, useState } from 'react';
import { buscar$, crear$ } from "../../services/EquipoServices";
import EquipoModel from "../../models/EquipoModel";
import MenuComponent from '../../components/MenuComponent';

function Usuario() {
  const [equipo, setEquipo] = useState(EquipoModel);
  const [listadoEquipos, setListadoEquipos] = useState([]);

  const asignarValores = e => {
    const { name, value } = e.target;
    setEquipo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const crearEquipo = async () => {
    const res = await crear$(equipo);
    setListadoEquipos(prevArray => [...prevArray, res]);
    limpiarFormulario();
  }

  const buscarEquipos = async () => {
    setListadoEquipos(await buscar$());
    limpiarFormulario();
  }

  const limpiarFormulario = () => {
    setEquipo(EquipoModel);
  }

  useEffect(() => {
    buscarEquipos();
  }, []);

  return (
    <div>
      <MenuComponent header/>
      <p className="title">equipos</p>
      <form>
        <div>
          <p>nombre</p>
          <input type="text" value={equipo.nombre} name="nombre" placeholder="nombre" onChange={asignarValores} />
        </div>
        <div>
          <button type="button" onClick={() => crearEquipo()}>Agregar</button>
        </div>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {listadoEquipos.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Usuario;
