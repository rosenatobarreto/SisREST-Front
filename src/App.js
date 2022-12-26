import React from 'react';
import AppRoutes from './main/AppRoutes';
import Footer from './components/Footer';
import LoginButton from "./components/Login";
import LogoutButton from "./components/Logout";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = "965349476239-1o9e0e1emo8nf7s9qcbpl4b5g2hm94uj.apps.googleusercontent.com";

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  });

  
  // const printToken = () => {
  //   // var accessToken = gapi.auth.getToken().access_token;

  //   console.log(gapi.auth.getToken().access_token);
  // }
  
  return (
    <div className="App">
      <AppRoutes />
      {/* <LoginButton />
      <LogoutButton /> */}
      <Footer />
    </div>
  );

}

export default App;
