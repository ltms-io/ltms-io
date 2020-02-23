import React from 'react';
import './App.css';
import LTMSNavbar from './components/LTMSNavbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import AccountDetails from './components/AccountDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <LTMSNavbar />
        <Switch>
          <Route path="/" exact component= { Home } />
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/login" component={ Login } />
          <Route path="/accountdetails" component={ AccountDetails } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
