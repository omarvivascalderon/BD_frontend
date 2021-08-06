import React, { useState, useEffect } from 'react';
import { buscar$ } from "../../services/EquipoServices";
import { crear$ } from "../../services/PartidoServices";
import { getSesionXItem } from "../../helpers/LocalStorage";
import PartidoModel from "../../models/PartidoModel";
import { useHistory } from "react-router-dom";
import MenuComponent from "../../components/MenuComponent";
import ErroresComponent from "../../components/Errores/ErroresComponent";

const RegistrarPartido = () => {
    const [usuario, setUsuario] = useState({});
    const [partido, setPartido] = useState(PartidoModel);
    const [equipos, setEquipos] = useState([]);
    const [errores, setErrores] = useState([]);

    let history = useHistory();

    const asignarValores = e => {
        const { name, value } = e.target;
        setPartido(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const crearPartido = async () => {
        if (validaciones()) {
            const res = await crear$(partido, usuario.id);
            if (res) {
                history.push("/verPartido");
            }
        }
    }

    useEffect(() => {
        async function buscarEquipos() {
            setUsuario(await getSesionXItem("usuario"));
            setEquipos(await buscar$());
        }
        buscarEquipos();
    }, []);


    const validaciones = () => {
        let errores = [];
        let validado = true;

        if (!partido.local) {
            validado = false;
            errores.push("El campo local no puede ir vacío");
        }

        if (!partido.visitante) {
            validado = false;
            errores.push("El campo visitante no puede ir vacío");
        }

        if (!partido.fecha) {
            validado = false;
            errores.push("El campo fecha no puede ir vacío");
        }

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
            <MenuComponent header={true} />
            <p className="title">Registrar partidos para el usuario <strong>{usuario.nombre}</strong> </p>
            <div>
                <form>
                    <div>
                        <p>local</p>
                        <select name="local" onChange={asignarValores}>
                            <option value={0}>----------</option>
                            {equipos.map(item => {
                                return <option key={item.id} value={item.id}>{item.nombre}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <p>visitante</p>
                        <select name="visitante" onChange={asignarValores}>
                            <option value={0}>----------</option>
                            {equipos.map(item => {
                                return <option key={item.id} value={item.id}>{item.nombre}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <p>fecha</p>
                        <input name="fecha" type="date" value={partido.fecha} onChange={asignarValores} />
                    </div>
                    <div>
                        <p>goles local</p>
                        <input type="number" value={partido.golesLocal} name="golesLocal" placeholder="golesLocal" onChange={asignarValores} />
                    </div>
                    <div>
                        <p>goles vistante</p>
                        <input type="number" value={partido.golesVisitante} name="golesVisitante" placeholder="golesVisitante" onChange={asignarValores} />
                    </div>
                    <div>
                        <button type="button" onClick={() => crearPartido()}>Crear partido para el usuario <strong>{usuario.nombre}</strong></button>
                    </div>
                </form>
            </div>
            <ErroresComponent errores={errores} />
        </div>
    );
}

export default RegistrarPartido;
