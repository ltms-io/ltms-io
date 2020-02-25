import React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import Sheet from './Scoresheet.js';

function generateSchedule() {
    ReactDOM.render(<Sheet />, document.getElementById('root'));
}

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => generateSchedule()} id = "button">Generate Schedule</button>
      </header>
    </div>
  );
}

export default App;
