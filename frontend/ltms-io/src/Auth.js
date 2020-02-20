import auth0 from "auth0-js";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "dev-s68c-q-y.auth0.com",
    clientID: "4J9E3tWlJczAxTGBR2YUO61Rmebmlnmf",
    redirectUri: "http://localhost:3000/home",
    audience: "https://dev-s68c-q-y.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid"
  });
}
