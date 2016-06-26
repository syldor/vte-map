require('bootstrap_css');
require("./styles.css");

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import App from './components/App'
import thunkMiddleware from 'redux-thunk'

//jquery required in webpack.config


const initialState = {
  mode: "VIZ",
  gyms: [],
  selected_infos: {},
  new_gym_coord: {}
}

let store = createStore(
	rootReducer,
	initialState,
	applyMiddleware(
		thunkMiddleware
	)
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

