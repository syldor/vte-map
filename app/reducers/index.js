import { combineReducers } from 'redux'
import { ACTIVATE_ADD_MODE, ACTIVATE_VIZ_MODE } from '../constants/ActionTypes'
import { RECEIVE_GYMS, DISPLAY_GYM_INFO, UPDATE_NEW_GYM_COORD } from '../actions/actions'


function mode(state = "VIZ", action) {
	switch(action.type) {
		case ACTIVATE_ADD_MODE:
			return action.mode;
		case ACTIVATE_VIZ_MODE:
			return action.mode;
		default:
			return state;
	}
}

function selected_infos(state = {}, action) {
	switch(action.type) {
		case DISPLAY_GYM_INFO:
			return action.data;
		default:
			return state;
	}
}

function gyms(state = [], action) {
  switch (action.type) {
    case RECEIVE_GYMS:
      return action.gyms;
    default:
      return state;
  }
}

function new_gym_coord(state = {}, action) {
	switch(action.type) {
		case UPDATE_NEW_GYM_COORD:
			return action.data;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	mode,
	selected_infos,
	gyms,
	new_gym_coord
})


export default rootReducer