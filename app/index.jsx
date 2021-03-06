require('bootstrap_css');
require("./node_modules/bootstrap/dist/js/bootstrap.min.js");
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
  selected_infos: {
    hours: []
  },
  new_gym_coord: {},
  new_gym_hours:[],
  comments_list: [],
  language: 'en' 
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

