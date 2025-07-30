import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "primereact/resources/themes/saga-green/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import jwt_decode from "jwt-decode";
import "toastr/build/toastr.min.js";
import "toastr/build/toastr.css";
import { showSuccessMessage } from "./components/Toastr";

import Login from "./pages/login/Login";
import Signup from "./components/signup/Signup";
import Profile from "./components/profile/Profile";
import OAuth2RedirectHandler from "./services/oauth2/OAuth2RedirectHandler";
import NotFound from "./components/common/NotFound";
import LoadingIndicator from "./components/common/LoadingIndicator";
import { getCurrentUser } from "./util/APIUtils";
import { ACCESS_TOKEN } from "./services/constants/Constants";
import PrivateRoute from "./main/PrivateRoute";
import CadastrarContaEstudante from "./pages/cadastrarContaEstudante/CadastrarContaEstudante";
import ListarContasEstudante from "./pages/listarContasEstudante/ListarContasEstudante";
import AtualizarContaEstudante from "./pages/atualizarContaEstudante/AtualizarContaEstudante";

import CadastrarBeneficiario from "./pages/cadastrarBeneficiario/CadastrarBeneficiario";
import ListarBeneficiarios from "./pages/listarBeneficiarios/ListarBeneficiarios";
import AtualizarBeneficiario from "./pages/atualizarBeneficiario/AtualizarBeneficiario";
import DetalharBeneficiario from "./pages/detalharBeneficiario/DetalharBeneficiario";
import DadosBeneficiario from "./pages/detalharBeneficiario/DadosBeneficiario";
import ImportarBeneficiarios from "./pages/importarBeneficiarios/ImportarBeneficiarios";
import ImportarBeneficiarios2 from "./pages/importarBeneficiarios/ImportarBeneficiarios2";

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

import PedirAcesso from "./pages/pedirAcesso/PedirAcesso";
import ValidarPedidoAcesso from "./pages/validarPedidoAcesso/ValidarPedidoAcesso";
import ListarPedidosAcesso from "./pages/listarPedidosAcesso/ListarPedidosAcesso";
import ParticiparListaDiaria from "./pages/confirmarPresenca/ConfirmarPresenca";
import ListaDiaria from "./pages/listaDiaria/ListaDiaria";

import BoasVindas from "./pages/boasVindas/BoasVindas";
import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
      decodedRoleEstudante: null,
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
        console.log(response)
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

            <PrivateRoute
              path="/header"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Header} />

            <PrivateRoute
              path="/profile"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Profile} />

            <Route
              path="/signup"
              render={(props) => (
                <Signup authenticated={this.state.authenticated} {...props} />
              )}
            />
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />

            <PrivateRoute
              path="/cadastrarContaEstudante"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={CadastrarContaEstudante} />

            <PrivateRoute
              path="/listarContasEstudante"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ListarContasEstudante} />

            <PrivateRoute
              path="/atualizarContaEstudante/:id"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={AtualizarContaEstudante} />

            <PrivateRoute
              path="/cadastrarBeneficiario"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={CadastrarBeneficiario} />

            <PrivateRoute
              path="/listarBeneficiarios"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ListarBeneficiarios} />

            <PrivateRoute
              path="/importarBeneficiarios"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ImportarBeneficiarios} />
            
            <PrivateRoute
              path="/importarBeneficiarios2"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ImportarBeneficiarios2} />

            <PrivateRoute
              path="/atualizarBeneficiario/:id"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={AtualizarBeneficiario} />

            <PrivateRoute
              path="/detalharBeneficiario/:id"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              // render={(props) => <DetalharBeneficiario {...props} />}
              component={DetalharBeneficiario} />
            <PrivateRoute
              path="/dadosBeneficiario"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              // render={(props) => <DetalharBeneficiario {...props} />}
              component={DadosBeneficiario} />

            <PrivateRoute
              path="/cadastrarEdital"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={CadastrarEdital} />

            <PrivateRoute
              path="/atualizarEdital/:id"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={AtualizarEdital} />

            <PrivateRoute
              path="/listarEditais"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ListarEditais} />

            <PrivateRoute
              path="/cadastrarContaServidor"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={CadastrarContaServidor} />

            <PrivateRoute
              path="/listarContasServidor"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ListarContasServidor} />

            <PrivateRoute
              path="/atualizarContaServidor/:id"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={AtualizarContaServidor} />

            <PrivateRoute
              path="/cadastrarRefeicao"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={CadastrarRefeicao} />

            <PrivateRoute
              path="/listarRefeicoes"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ListarRefeicoes} />

            <PrivateRoute
              path="/atualizarRefeicao/:id"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={AtualizarRefeicao} />

            <PrivateRoute
              path="/cadastrarCardapio"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={CadastrarCardapio} />

            <PrivateRoute
              path="/listarCardapios"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ListarCardapios} />

            <PrivateRoute
              path="/atualizarCardapio/:id"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={AtualizarCardapio} />

            <PrivateRoute
              path="/pedirAcesso"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={PedirAcesso} />

            <PrivateRoute
              path="/validarPedidoAcesso/:id"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ValidarPedidoAcesso} />

            <PrivateRoute
              path="/listarPedidosAcesso"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ListarPedidosAcesso} />

            <PrivateRoute
              path="/participarListaDiaria"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ParticiparListaDiaria} />

            <PrivateRoute
              path="/listaDiaria"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ListaDiaria} />

            <PrivateRoute
              path="/boasVindas"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={BoasVindas}
            />

            <Route component={NotFound} />
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