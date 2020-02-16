import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createStore } from 'redux';

const initState = {
	name: "First Last",
	tournaments: []
}

function reducer(state = initState, action) {
	if (action.type == "ADD_TOURNAMENT") {
		return {
			...state,
			tournaments: [...state.tournaments, action.tournament]
		};
	}
	if (action.type == "SET_NAME") {
		return {
			...state,
			name: action.name
		};
	}
}

const store = createStore(reducer);

store.subscribe(() => {
	console.log("state updated:");
	console.log(store.getState());
})

store.dispatch({type: "ADD_TOURNAMENT", tournament: "Purdue FLL 2020"});
store.dispatch({type: "ADD_TOURNAMENT", tournament: "Indiana FLL 2020"});
store.dispatch({type: "SET_NAME", name: "Litmus Aiyo"});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
