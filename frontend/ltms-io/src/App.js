import React from 'react';
import './App.css';
import LTMS from './LTMS';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <h1>LTMS.io</h1>
        <Switch>
          <Route path="/" exact component= { Home } />
          <Route path="/ltms" component={ LTMS } />
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Welcome!</h1>
    <a href="/ltms">Tournament List</a>
  </div>
);

export default App;
