import React, { Component } from "react";
import Auth from "../Auth";

export default class Callback extends Component {
  componentDidMount() {
    const auth = new Auth();
    auth.handleAuthentication();
  }

  render() {
    return <div>Loading ...</div>;
  }
}
