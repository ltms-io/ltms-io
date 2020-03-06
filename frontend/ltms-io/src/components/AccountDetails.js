import React, { Component } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ResetLogin from './ResetLogin';
import logo from '../logo.svg';
import axios from 'axios';

class AccountDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      dbresults: {},
      authresults: {}
    };

    this.handleName = this.handleName.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async handleName(e) {
    e.preventDefault();
    alert("Resetting name to: " + e.target.elements.name.value);
    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    //await axios.patch("http://localhost:5000/api/users/5e54b2a86efec099146c054b", {
    await axios.patch(`http://localhost:5000/api/users/${this.state.uid}`, {
      email: this.state.dbresults.email,
      name: e.target.elements.name.value
    })
    .catch( (error) => {
      console.log(error);
    });

    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    //await axios.get(`http://localhost:5000/api/users/5e54b2a86efec099146c054b`)
    await axios.get(`http://localhost:5000/api/users/${this.state.uid}`)
      .then ( (result) => {
        this.state.dbresults = result.data;
      })
      .catch( (error) => {
        console.log(error);
      });

    console.log("UPDATED STATE", this.state);
  }

  async handleDelete(e) {
    e.preventDefault();
    alert("Deleting account!");

    // Use this statement instead once backend Auth0 connection for register
    // is complete (5e54b2a86efec099146c054b is random test uid):
    //await axios.delete("http://localhost:5000/api/users/5e54b2a86efec099146c054b")
    await axios.delete(`http://localhost:5000/api/users/${this.state.uid}`)
    .catch( (error) => {
      console.log(error);
    });

    this.props.auth.logout();
  }

  render() {
    return(
      <div>
        <h1>Edit Account Details</h1>
        <div>
          <Container>
            <Row>
              <Col>
                <div>
                  <h3>Edit Profile Picture</h3>
                  <img alt="profile" src={logo} />
                </div>
                <div>
                  <h3>Edit Name</h3>
                  <Form onSubmit={this.handleName}>
                    <Row>
                      <Col>
                        <Form.Group controlId="name">
                          <Form.Control defaultValue={this.state.dbresults.name} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button variant="outline-primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </div>
              </Col>
              <Col>
                <ResetLogin />
              </Col>
            </Row>
          </Container>
        </div>
        <div>
          <Button variant="outline-danger" onClick={this.handleDelete}>
            Delete my Account
          </Button>
        </div>
      </div>
    );
  }


  async componentDidMount() {
    /*
    await axios({
      method: 'PATCH',
      url: 'https://dev-s68c-q-y.auth0.com/api/v2/users/auth0|5e5726562072370d5bf4b75a',
      headers: {
        'content-type': 'application/json',
        'authorization': 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlF6UTFPVVpGTTBRNFFUVTFRa1UyTmpJM05qQXpRMEpFUWpSR1JqZEJSRGhDTVRjeE5UZ3pSQSJ9.eyJpc3MiOiJodHRwczovL2Rldi1zNjhjLXEteS5hdXRoMC5jb20vIiwic3ViIjoib3JGbFVZTkdSNmZjV1ZweWU5a2dIdElOa2s3VFpoOWJAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LXM2OGMtcS15LmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTgyOTExNDI3LCJleHAiOjE1ODI5OTc4MjcsImF6cCI6Im9yRmxVWU5HUjZmY1dWcHllOWtnSHRJTmtrN1RaaDliIiwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcl90aWNrZXRzIHJlYWQ6Y2xpZW50cyB1cGRhdGU6Y2xpZW50cyBkZWxldGU6Y2xpZW50cyBjcmVhdGU6Y2xpZW50cyByZWFkOmNsaWVudF9rZXlzIHVwZGF0ZTpjbGllbnRfa2V5cyBkZWxldGU6Y2xpZW50X2tleXMgY3JlYXRlOmNsaWVudF9rZXlzIHJlYWQ6Y29ubmVjdGlvbnMgdXBkYXRlOmNvbm5lY3Rpb25zIGRlbGV0ZTpjb25uZWN0aW9ucyBjcmVhdGU6Y29ubmVjdGlvbnMgcmVhZDpyZXNvdXJjZV9zZXJ2ZXJzIHVwZGF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGRlbGV0ZTpyZXNvdXJjZV9zZXJ2ZXJzIGNyZWF0ZTpyZXNvdXJjZV9zZXJ2ZXJzIHJlYWQ6ZGV2aWNlX2NyZWRlbnRpYWxzIHVwZGF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmRldmljZV9jcmVkZW50aWFscyBjcmVhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIHJlYWQ6cnVsZXMgdXBkYXRlOnJ1bGVzIGRlbGV0ZTpydWxlcyBjcmVhdGU6cnVsZXMgcmVhZDpydWxlc19jb25maWdzIHVwZGF0ZTpydWxlc19jb25maWdzIGRlbGV0ZTpydWxlc19jb25maWdzIHJlYWQ6aG9va3MgdXBkYXRlOmhvb2tzIGRlbGV0ZTpob29rcyBjcmVhdGU6aG9va3MgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDp0ZW5hbnRfc2V0dGluZ3MgdXBkYXRlOnRlbmFudF9zZXR0aW5ncyByZWFkOmxvZ3MgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIHJlYWQ6bG9nX3N0cmVhbXMgY3JlYXRlOmxvZ19zdHJlYW1zIGRlbGV0ZTpsb2dfc3RyZWFtcyB1cGRhdGU6bG9nX3N0cmVhbXMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.GMcWPtiMo5SLxzWp3v3M77K9xlVeFy-RNXMVc54tQo-nFcAuETe3a5A_8l6boXMEV9-ZBwti6jRz6GnQYZjFfZ6bcXwJNG7EwpkVo-IAclqAfmEwTMGypdp8T8VgBQfo_vhXEDANZDqahPUodxu1vMtpc0AWm8EmOJzfk30c7KPCzyJUG7enACHnpbKLTpOM4bi8PFPjn0V6mf3w3CVJrWM7r9dQG4LHxJRgsN9ExdDpf0cU4rPn1xb_xJfot_E_ZvkgEUA9lvEXZNlGCrFyyC7OZ4ipVxPicrydEA3OAIOXEtUbc8d-G8rYJsFAr-11bLiiAKX_eLtuOLRGEnHs8g"
      },
      data: {
        email: "ltmstest@mailinator.com"
      },
      json: true
    })
    .then( (result) => {
      console.log(result);
    })
    .catch( (error) => {
      console.log(error);
    });
    */

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
      this.state.authresults = result.data;
      this.state.uid = this.state.authresults.sub;
    })
    .catch( (error) => {
      console.log(error);
    });

    await axios.post(`http://localhost:5000/api/users/getuser`, {
      auth0id: this.state.uid
    }).then ( (result) => {
        this.state.dbresults = result.data;
    }).catch( (error) => {
        console.log(error);
    });

    this.setState(this.state);

    console.log("INITIAL ACCOUNT DETAILS STATE", this.state);
  }
}

export default AccountDetails;
