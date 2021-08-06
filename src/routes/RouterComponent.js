import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { 
    Login,
    Usuario, 
    MenuComponent, 
    VerPartido, 
    RegistrarPartido, 
    GolesPartido, 
    Equipo 
} from "../views";

function RouterComponent() {
    return (
        <BrowserRouter>
            <div id="container-notify"></div>
            <Switch>
                <Route
                    path="/login"
                    render={(props) => <Login {...props} />} />
                <Route
                    path="/usuario"
                    render={(props) => <Usuario {...props} />} />
                <Route
                    path="/menu"
                    render={(props) => <MenuComponent {...props} />} />
                <Route
                    path="/verPartido"
                    render={(props) => <VerPartido {...props} />} />
                <Route
                    path="/registrarPartido"
                    render={(props) => <RegistrarPartido {...props} />} />
                <Route
                    path="/golesPartidos"
                    render={(props) => <GolesPartido {...props} />} />
                <Route
                    path="/equipo"
                    render={(props) => <Equipo {...props} />} />

                <Redirect to="/login" />
            </Switch>
        </BrowserRouter>
    )
}

export default RouterComponent;
