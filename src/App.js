import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "primereact/resources/themes/saga-green/theme.css"
import "primereact/resources/primereact.min.css";                                       
import "primeicons/primeicons.css";

import "toastr/build/toastr.min.js";
import "toastr/build/toastr.css";
// import AppRoutes from './main/AppRoutes';
import Footer from "./components/Footer";
// import SessionProvider from './main/SessionProvider';
// import LoginButton from "./components/Login";
// import LogoutButton from "./components/Logout";
// import { useEffect } from 'react';
// import { gapi } from 'gapi-script';
import { showSuccessMessage } from "./components/Toastr";

import TemplateDemo from "./pages/login/templateDemo";
import Login from "./pages/login/Login";
import Signup from "./components/signup/Signup";
import Profile from "./components/profile/Profile";
import OAuth2RedirectHandler from "./services/oauth2/OAuth2RedirectHandler";
import NotFound from "./components/common/NotFound";
import LoadingIndicator from "./components/common/LoadingIndicator";
import { getCurrentUser } from "./util/APIUtils";
import { ACCESS_TOKEN } from "./services/constants/Constants";
import PrivateRoute from "./main/PrivateRoute";
// import AppHeader from "./components/common/AppHeader";
// import Alert from 'react-s-alert';
// import 'react-s-alert/dist/s-alert-default.css';
// import 'react-s-alert/dist/s-alert-css-effects/slide.css';
// import Home from "./home/Home";
import CadastrarContaEstudante from "./pages/cadastrarContaEstudante/CadastrarContaEstudante";
import ListarContasEstudante from "./pages/listarContasEstudante/ListarContasEstudante";
import AtualizarContaEstudante from "./pages/atualizarContaEstudante/AtualizarContaEstudante";

import CadastrarBeneficiario from "./pages/cadastrarBeneficiario/CadastrarBeneficiario";
import ListarBeneficiarios from "./pages/listarBeneficiarios/ListarBeneficiarios";
import AtualizarBeneficiario from "./pages/atualizarBeneficiario/AtualizarBeneficiario";
import ImportarBeneficiarios from "./pages/importarBeneficiarios/ImportarBeneficiarios";
import DetalharBeneficiario from "./pages/detalharBeneficiario/DetalharBeneficiario";

import CadastrarEdital from "./pages/cadastrarEdital/CadastrarEdital";
import AtualizarEdital from "./pages/atualizarEdital/AtualizarEdital";
import ListarEditais from "./pages/listarEditais/ListarEditais";

import CadastrarContaServidor from "./pages/cadastrarContaServidor/CadastrarContaServidor";
import ListarContasServidor from "./pages/listarContasServidor/ListarContasServidor";
import AtualizarContaServidor from "./pages/atualizarContaServidor/AtualizarContaServidor";

import CadastrarRefeicao from "./pages/cadastrarRefeicao/CadastrarRefeicao";
import ListarRefeicoes from "./pages/listarRefeicoes/ListarRefeicoes";
import AtualizarRefeicao from "./pages/atualizarRefeicao/AtualizarRefeicao";

import CadastrarCardapio from "./pages/cadastrarCardapio/CadastrarCardapio";
import ListarCardapios from "./pages/listarCardapios/ListarCardapios";
import AtualizarCardapio from "./pages/atualizarCardapio/AtualizarCardapio";

import PedidoDeAcesso from "./pages/pedidoDeAcesso/PedidoDeAcesso";

import BoasVindas from "./pages/boasVindas/BoasVindas";
import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    showSuccessMessage("Você está desconectado com segurança!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }



  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    return (
      <div>
        <div>
          {/* <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} /> */}
        </div>
        <div className="">
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route path="/templateDemo" component={TemplateDemo}></Route>
            <PrivateRoute
              path="/header"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Header}/>
            <PrivateRoute
              path="/profile"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Profile}/>
            <Route
              path="/signup"
              render={(props) => (
                <Signup authenticated={this.state.authenticated} {...props} />
              )}
            />
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>

            <PrivateRoute
              path="/cadastrarContaEstudante"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={CadastrarContaEstudante}/>
            <PrivateRoute
              path="/listarContasEstudante"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ListarContasEstudante}/>
            <PrivateRoute
              path="/atualizarContaEstudante/:id"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={AtualizarContaEstudante}/>
            
            <PrivateRoute
              path="/cadastrarBeneficiario"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={CadastrarBeneficiario}/>
            <PrivateRoute
              path="/listarBeneficiarios"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ListarBeneficiarios}/>
            <PrivateRoute
              path="/importarBeneficiarios"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ImportarBeneficiarios}/>
            <PrivateRoute
              path="/atualizarBeneficiario/:id"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={AtualizarBeneficiario}/>
            <PrivateRoute
              path="/detalharBeneficiario/:id"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              // render={(props) => <DetalharBeneficiario {...props} />}
              component={DetalharBeneficiario}/>
            
            <PrivateRoute 
              path="/cadastrarEdital" 
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={CadastrarEdital}/>
            <PrivateRoute 
              path="/atualizarEdital/:id"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser} 
              component={AtualizarEdital}/>
            <PrivateRoute
              path="/listarEditais"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser} 
              component={ListarEditais}/>
            
            <PrivateRoute 
              path="/cadastrarContaServidor" 
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={CadastrarContaServidor}/>
            <PrivateRoute 
              path="/listarContasServidor" 
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ListarContasServidor}/>
            <PrivateRoute 
              path="/atualizarContaServidor/:id" 
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={AtualizarContaServidor}/>
            
            <PrivateRoute 
              path="/cadastrarRefeicao" 
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={CadastrarRefeicao}/>
            <PrivateRoute 
              path="/listarRefeicoes" 
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ListarRefeicoes}/>
            <PrivateRoute 
              path="/atualizarRefeicao/:id" 
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={AtualizarRefeicao}/>
            
            <PrivateRoute
              path="/cadastrarCardapio" 
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={CadastrarCardapio}/>
            <PrivateRoute 
              path="/listarCardapios" 
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ListarCardapios}/>
            <PrivateRoute 
              path="/atualizarCardapio/:id" 
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={AtualizarCardapio}/>

            <PrivateRoute 
              path="/pedidoDeAcesso" 
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={PedidoDeAcesso}/>

            <PrivateRoute
              path="/boasVindas"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={BoasVindas}/>   

            <Route component={NotFound}/>
          </Switch>
        </div>
        {/* <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} /> */}
          {/* <div>
            <Footer />
          </div> */}
      </div>
    );
  }
}

export default App;

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       authenticated: false,
//       currentUser: null,
//       loading: true
//     }

//     this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
//     this.handleLogout = this.handleLogout.bind(this);
//   }

//   loadCurrentlyLoggedInUser() {
//     getCurrentUser()
//     .then(response => {
//       this.setState({
//         currentUser: response,
//         authenticated: true,
//         loading: false
//       });
//     }).catch(error => {
//       this.setState({
//         loading: false
//       });
//     });
//   }

//   handleLogout() {
//     localStorage.removeItem(ACCESS_TOKEN);
//     this.setState({
//       authenticated: false,
//       currentUser: null
//     });
//     showSuccessMessage("Você foi desconectado com segurança!");
//   }

//   componentDidMount() {
//     this.loadCurrentlyLoggedInUser();
//   }

//   render() {
//     if(this.state.loading) {
//       return <LoadingIndicator />
//     }

//     return (
//       <div className="">
//         <div className="">
//           <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
//         </div>
//         <div className="">
//           <Switch>
//             <Route exact path="/" component={Home}></Route>
//             <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
//               component={Profile}></PrivateRoute>
//             <Route path="/login"
//               render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
//             <Route path="/signup"
//               render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
//             <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
//             <Route component={NotFound}></Route>
//           </Switch>
//         </div>
//         <Alert stack={{limit: 3}}
//           timeout = {3000}
//           position='top-right' effect='slide' offset={65} />
//       </div>
//     );
//   }
// }

// export default App;

// const clientId = "965349476239-1o9e0e1emo8nf7s9qcbpl4b5g2hm94uj.apps.googleusercontent.com";

// function App() {

// useEffect(() => {
//   function start() {
//     gapi.client.init({
//       clientId: clientId,
//       scope: ""
//     })
//   };
//   gapi.load('client:auth2', start);
// });

// const printToken = () => {
//   // var accessToken = gapi.auth.getToken().access_token;

//   console.log(gapi.auth.getToken().access_token);
// }

// return (
//   <div>
// {/* <SessionProvider> */}
// <AppRoutes />
// {/* <LoginButton />
// <LogoutButton /> */}
// {/* </SessionProvider> */}
//         <div>
//           <Footer />
//         </div>
//     </div>
//   );

// }

// export default App;
