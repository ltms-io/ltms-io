/* eslint no-restricted-globals: 0*/
import auth0 from "auth0-js";
import axios from 'axios';

const LOGIN_SUCCESS_PAGE = "/";
const LOGIN_FAIL_PAGE = "/login";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "dev-s68c-q-y.auth0.com",
    clientID: "4J9E3tWlJczAxTGBR2YUO61Rmebmlnmf",
    redirectUri: "http://localhost:3000/callback",
    audience: "https://dev-s68c-q-y.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid profile email"
  });

  constructor() {
    this.login = this.login.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash( async (err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);

        var uid = "";
        var authresults = {};
        var dbresults = {};
        await axios({
          method: 'GET',
          url: `https://dev-s68c-q-y.auth0.com/userinfo`,
          headers: {
            'content-type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem("access_token")
          },
          json: true
        })
        .then( (result) => {
          authresults = result.data;
          uid = this.state.authresults.sub;
        })
        .catch( (error) => {
          console.log(error);
        });

        await axios.get(`http://localhost:5000/api/users/${uid.substring(6)}`)
          .then ( (result) => {
            dbresults = result.data;
          })
          .catch( async (error) => {
            if (error.response.status === 404) {
              await axios.post(`http://localhost:5000/api/users/register`, {
                uid: uid.substring(6),
                email: authresults.email,
                name: authresults.name
              })
              .catch( (error) => {
                console.log(error);
              });
            }
            else {
              console.log(error);
            }
          });

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

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    location.pathname = LOGIN_FAIL_PAGE;
  }
}
