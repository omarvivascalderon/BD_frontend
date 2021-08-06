import './Menu.css';
import React from 'react';
import { Link } from "react-router-dom";

const MenuComponent = ({ header }) => {
    if (!header) {
        return (
            <div className="menu-container">
                <div className="menu">
                    <Link to="/usuario">Usuario</Link>
                </div>
                <div className="menu">
                    <Link to="/registrarPartido">Registrar Partido</Link>
                </div>
                <div className="menu">
                    <Link to="/verPartido">Ver Partido</Link>
                </div>
                <div className="menu">
                    <Link to="/equipo">Equipos</Link>
                </div>
                <div className="menu salir">
                    <Link to="/login">Salir</Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="header-container">
                <div className="header">
                    <Link to="/usuario">Usuario</Link>
                </div>
                <div className="header">
                    <Link to="/registrarPartido">Registrar Partido</Link>
                </div>
                <div className="header">
                    <Link to="/verPartido">Ver Partido</Link>
                </div>
                <div className="header">
                    <Link to="/equipo">Equipos</Link>
                </div>
                <div className="header salir">
                    <Link to="/login">Salir</Link>
                </div>
            </div>
        );
    }

}

export default MenuComponent;
