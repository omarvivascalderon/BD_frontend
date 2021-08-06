import './Usuario.css';
import React, { useEffect, useState } from 'react';
import { buscar$, actualizar$, crear$, eliminar$ } from "../../services/UsuarioServices";
import UsuarioModel from "../../models/UsuarioModel";
import MenuComponent from '../../components/MenuComponent';

function Usuario() {
  const [usuario, setUsuario] = useState(UsuarioModel);
  const [usuarios, setUsuarios] = useState([]);

  const asignarValores = e => {
    const { name, value } = e.target;
    setUsuario(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const crearUsuario = async () => {
    const res = await crear$(usuario);
    setUsuarios(prevArray => [...prevArray, res]);
    limpiarFormulario();
  }

  const eliminarUsuario = async (id) => {
    await eliminar$(id);
    setUsuarios(usuarios.filter(item => item.id !== id))
  }

  const actualizarUsuario = async () => {
    await actualizar$(usuario);
    buscarUsuarios();
  }

  const buscarUsuarios = async () => {
    setUsuarios(await buscar$());
    limpiarFormulario();
  }

  const limpiarFormulario = () => {
    setUsuario(UsuarioModel);
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <div>
      <MenuComponent header/>
      <p className="title">usuarios</p>
      <form>
        <div>
          <p>nombre</p>
          <input type="text" value={usuario.nombre} name="nombre" placeholder="nombre" onChange={asignarValores} />
        </div>
        <div>
          <p>correo</p>
          <input type="text" value={usuario.correo} name="correo" placeholder="correo" onChange={asignarValores} />
        </div>
        <div>
          <p>username</p>
          <input type="text" value={usuario.username} name="username" placeholder="username" onChange={asignarValores} />
        </div>
        <div>
          <p>password</p>
          <input type="text" value={usuario.password} name="password" placeholder="password" onChange={asignarValores} />
        </div>
        <div>
          {usuario.id > 0 ? <button type="button" onClick={() => actualizarUsuario()}>Actualizar</button> : <button type="button" onClick={() => crearUsuario()}>Agregar</button>}
        </div>
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Username</th>
              {/*<th>Editar</th>
              <th>Eliminar</th>*/}
            </tr>
          </thead>
          <tbody>
            {usuarios.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.correo}</td>
                  <td>{item.username}</td>
                  {/*<td>
                    <button className="eliminar" onClick={() => eliminarUsuario(item.id)}>Eliminar</button>
                  </td>
                  <td>
                    <button className="editar" onClick={() => setUsuario(item)}>Editar</button>
                  </td>*/}
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
