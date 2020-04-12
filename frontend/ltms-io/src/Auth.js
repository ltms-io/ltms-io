/* eslint no-restricted-globals: 0*/
import auth0 from "auth0-js";
import axios from 'axios';

const LOGIN_SUCCESS_PAGE = "/";
const LOGIN_FAIL_PAGE = "/login";

export default class Auth {
  auth0 = null;

  constructor() {
    this.login = this.login.bind(this);

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      auth0 = new auth0.WebAuth({
        domain: "dev-s68c-q-y.auth0.com",
        clientID: "4J9E3tWlJczAxTGBR2YUO61Rmebmlnmf",
        redirectUri: "http://localhost:3000/callback",
        audience: "https://dev-s68c-q-y.auth0.com/userinfo",
        responseType: "token id_token",
        scope: "openid profile email"
      });
    } else {
      auth0 = new auth0.WebAuth({
        domain: "dev-s68c-q-y.auth0.com",
        clientID: "4J9E3tWlJczAxTGBR2YUO61Rmebmlnmf",
        redirectUri: "https://ltms-io.herokuapp.com/callback",
        audience: "https://dev-s68c-q-y.auth0.com/userinfo",
        responseType: "token id_token",
        scope: "openid profile email"
      });
    }
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash(async (err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);
        axios({
          method: 'GET',
          url: 'https://dev-s68c-q-y.auth0.com/userinfo',
          headers: {
            'authorization': `Bearer ${authResults.accessToken}`,
          }
        }).then((userDataResponse) => {
          localStorage.setItem("auth0_id", userDataResponse.data.sub);
          axios.post(`/api/users/auth`, {
            data: userDataResponse.data
          }).then((x) => {
            location.hash = "";
            location.pathname = LOGIN_SUCCESS_PAGE;
          });
        });

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

  logout() {
    var token = document.cookie.substring(13);
    document.cookie = "UserIdentity=" + token + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    location.pathname = LOGIN_FAIL_PAGE;
  }
}
