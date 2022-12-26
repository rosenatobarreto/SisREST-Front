import React from "react";
import {Route, BrowserRouter} from 'react-router-dom';

import Login from "../pages/login/Login";
import CreateBeneficiario from "../pages/cadastrarBeneficiario/CadastrarBeneficiario";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Route component = { Login } path = "/" exact />
            <Route component ={ CreateBeneficiario } path = "/cadastrarBeneficiario" />
            
        </BrowserRouter>
    );
}

export default AppRoutes;