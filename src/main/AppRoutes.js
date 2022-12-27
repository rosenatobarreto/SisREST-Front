import React from "react";
import {Route, BrowserRouter} from 'react-router-dom';

import Login from "../pages/login/Login";
import CadastrarBeneficiario from "../pages/cadastrarBeneficiario/CadastrarBeneficiario";
import ListarBeneficiarios from "../pages/listarBeneficiarios/ListarBeneficiarios";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Route component = { Login } path = "/" exact />
            <Route component ={ CadastrarBeneficiario } path = "/cadastrarBeneficiario" />
            <Route component ={ ListarBeneficiarios } path = "/listarBeneficiarios" />

            
        </BrowserRouter>
    );
}

export default AppRoutes;