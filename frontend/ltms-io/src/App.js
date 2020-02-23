import React from 'react';
import './App.css';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ResetLogin from './components/ResetLogin';
import AccountDetails from './components/AccountDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>LTMS.io</h1>
        <Switch>
          <Route path="/" exact component= { Home } />
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/login" component={ Login } />
          <Route path="/resetlogin" component={ ResetLogin } />
          <Route path="/accountdetails" component={ AccountDetails } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
