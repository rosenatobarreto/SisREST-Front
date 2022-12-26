import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const CLIENT_ID =
  "168310183059-18225omnsta5d8renf3neg15qkcilqeg.apps.googleusercontent.com";

const YOUTUBE_SCOPES = "https://www.googleapis.com/auth/youtube.readonly";

class GoogleLoginTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogined: false
    };
  }

  responseGoogle = (response) => {
    console.log(response);
    this.setState((state) => ({ isLogined: !state.isLogined }));
  };

  render() {
    return (
      <>
        {this.state.isLogined ? (
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        ) : (
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
            // scope={YOUTUBE_SCOPES}
          />
        )}
      </>
    );
  }
}

export default GoogleLoginTest;