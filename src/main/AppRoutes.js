import React from "react";
import {Route, BrowserRouter, Switch} from 'react-router-dom';

import Login from "../pages/login/Login";
import CadastrarBeneficiario from "../pages/cadastrarBeneficiario/CadastrarBeneficiario";
import ListarBeneficiarios from "../pages/listarBeneficiarios/ListarBeneficiarios";
import ImportarBeneficiarios from "../pages/importarBeneficiarios/ImportarBeneficiarios";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route component = { Login } path = "/" exact />
                <Route component ={ CadastrarBeneficiario } path = "/cadastrarBeneficiario" />
                <Route component ={ ListarBeneficiarios } path = "/listarBeneficiarios" />
                <Route component ={ ImportarBeneficiarios } path = "/importarBeneficiarios" />
            </Switch>
        </BrowserRouter>
    );
}

export default AppRoutes;

// export default () => (
//     <AuthConsumer>
//         { (context) => (<AppRoutes isAuthenticated={context.isAuthenticated} />) }
//     </AuthConsumer>
// )

//////////////

// function AppRoutes(props) {
//     return (
//         <BrowserRouter>
//             <Switch>
//                 <Route component={Home} path="/" exact />
//                 <Route component={Login} path="/login" />
//                 <Route component={CreateUser} path="/createUser" />


//                 <RestrictedRoute show={props.isAuthenticated} component={CreateDepartament} path="/createDepartament" /> 
//                 <RestrictedRoute show={props.isAuthenticated} component={ViewDepartaments} path="/viewDepartaments" />
//                 <RestrictedRoute show={props.isAuthenticated} component={UpdateDepartament} path="/updateDepartament/:id" />
//                 <RestrictedRoute show={props.isAuthenticated} component={DeleteDepartament} path="/deleteDepartament" />

//                 {/* <RestrictedRoute show={props.isAuthenticated} component={CreateUser} path="/createUser" /> */}
//                 <RestrictedRoute show={props.isAuthenticated} component={ViewUsers} path="/viewUsers" />
//                 <RestrictedRoute show={props.isAuthenticated} component={UpdateUser} path="/updateUser/:id" />
//                 <RestrictedRoute show={props.isAuthenticated} component={DeleteUser} path="/deleteUser" />

//                 <RestrictedRoute show={props.isAuthenticated} component={CreateComment} path="/createComment" />
//                 <RestrictedRoute show={props.isAuthenticated} component={ViewComments} path="/viewComments" />
//                 <RestrictedRoute show={props.isAuthenticated} component={UpdateComment} path="/updateComment/:id" />
//                 <RestrictedRoute show={props.isAuthenticated} component={DeleteComment} path="/deleteComment" />

//                 <RestrictedRoute show={props.isAuthenticated} component={CreateAnswer} path="/createAnswer" />
//                 <RestrictedRoute show={props.isAuthenticated} component={ViewAnswers} path="/viewAnswer" />
                
//             </Switch>
//         </BrowserRouter>
//     );
// }