import { combineReducers } from 'redux'
import { ACTIVATE_ADD_MODE, ACTIVATE_VIZ_MODE } from '../constants/ActionTypes'
import { RECEIVE_GYMS, DISPLAY_GYM_INFO, UPDATE_NEW_GYM_COORD, ACTIVATE_ADD_COMMENT_MODE, RECEIVE_COMMENTS, SET_LANGUAGE } from '../constants/ActionTypes'


function mode(state = "VIZ", action) {
	switch(action.type) {
		case ACTIVATE_ADD_MODE:
			return "ADD";
		case ACTIVATE_VIZ_MODE:
			return "VIZ";
		case ACTIVATE_ADD_COMMENT_MODE:
			return "ADD_COMMENT"
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

function comments_list(state=[], action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.data || [];
    default:
      return state;
  }
}

function language(state='en', action) {
  switch (action.type) {
    case SET_LANGUAGE:
      return action.language || 'en';
    default:
      return state;
  }
}

const rootReducer = combineReducers({
	mode,
	selected_infos,
	gyms,
	new_gym_coord,
	comments_list,
	language
})


export default rootReducer