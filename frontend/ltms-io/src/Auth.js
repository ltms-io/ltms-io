/* eslint no-restricted-globals: 0*/
import auth0 from "auth0-js";

const LOGIN_SUCCESS_PAGE = "/";
const LOGIN_FAIL_PAGE = "/login";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "dev-s68c-q-y.auth0.com",
    clientID: "4J9E3tWlJczAxTGBR2YUO61Rmebmlnmf",
    redirectUri: "http://localhost:3000",
    audience: "https://dev-s68c-q-y.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid"
  });

  constructor() {
    this.login = this.login.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);
        location.hash = "";
        location.pathname = LOGIN_SUCCESS_PAGE;
      } else {
        location.pathname = LOGIN_FAIL_PAGE;
        console.log(err);
      }
    });
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }
}
