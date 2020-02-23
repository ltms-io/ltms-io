import React from 'react';
import Home from './Home';
import Dashboard from './Dashboard';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateTournament from './components/CreateTournament';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>LTMS.io</h1>
        <Switch>
          <Route path="/" exact component= { Home } />
          <Route path="/dashboard" component={ Dashboard } />
          <Route path="/login" component={ Login } />
          <Route path="/createtournament" component={ CreateTournament } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
