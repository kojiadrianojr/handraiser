<<<<<<< HEAD
import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import logo from "./../img/logo-cropped.png";
import "./index.css";
//material ui
import Grid from "@material-ui/core/Grid";

const responseGoogle = response => {
  console.log(response);
};

export default () => (
  <Grid container className="container">
    <Grid item className="item">
      <img src={logo} alt="logo" />
      <div className="text">
        <p className="signup">Sign In</p>
        <p>Use Your Google Account</p>
      </div>
      <GoogleLogin
        className="Login"
        clientId="28861163542-su8up622bc6br2c077qgaqp380g4m9k3.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </Grid>
  </Grid>
);

{
  /* <GoogleLogout
      clientId="28861163542-su8up622bc6br2c077qgaqp380g4m9k3.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={() => console.log("logged out")}
    ></GoogleLogout> */
}
