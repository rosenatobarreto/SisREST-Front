import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
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
import { showSuccessMessage, showErrorMessage } from "./components/Toastr";

import Login from "./pages/login/Login";
import Signup from "./components/signup/Signup";
import Profile from "./components/profile/Profile";
import OAuth2RedirectHandler from "./services/oauth2/OAuth2RedirectHandler";
import NotFound from "./components/common/NotFound";
import LoadingIndicator from "./components/common/LoadingIndicator";
import { getCurrentUser } from "./util/APIUtils";
import { ACCESS_TOKEN } from "./services/constants";
import PrivateRoute from "./main/PrivateRoute";
import AppHeader from "./components/common/AppHeader";
// import Alert from 'react-s-alert';
// import 'react-s-alert/dist/s-alert-default.css';
// import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Home from "./home/Home";
import CadastrarBeneficiario from "./pages/cadastrarBeneficiario/CadastrarBeneficiario";
import ListarBeneficiarios from "./pages/listarBeneficiarios/ListarBeneficiarios";
import ImportarBeneficiarios from "./pages/importarBeneficiarios/ImportarBeneficiarios";

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
    showSuccessMessage("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    return (
      <div className="">
        <div className="">
          {/* <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} /> */}
        </div>
        <div className="">
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <PrivateRoute
              path="/profile"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Profile}
            ></PrivateRoute>
            {/* <Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route> */}
            <Route
              path="/signup"
              render={(props) => (
                <Signup authenticated={this.state.authenticated} {...props} />
              )}
            ></Route>
            <Route
              path="/oauth2/redirect"
              component={OAuth2RedirectHandler}
            ></Route>
            {/* <Route path="/login" component={Login}></Route> */}
            <Route
              path="/cadastrarBeneficiario"
              component={CadastrarBeneficiario}
            ></Route>
            <Route
              path="/listarBeneficiarios"
              component={ListarBeneficiarios}
            ></Route>
            {/* <Route path="/login" component={Login}></Route>     */}
            <Route component={NotFound}></Route>
          </Switch>
        </div>
        {/* <Alert stack={{limit: 3}} 
          timeout = {3000}
          position='top-right' effect='slide' offset={65} /> */}
          <div>
            <Footer />
          </div>
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
