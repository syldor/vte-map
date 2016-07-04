import { ACTIVATE_ADD_MODE, 
         ACTIVATE_VIZ_MODE, 
         REQUEST_GYMS, 
         UPDATE_NEW_GYM_COORD, 
         SEND_ADD_GYM, 
         ACTIVATE_ADD_COMMENT_MODE,
         DISPLAY_GYM_INFO,
         RECEIVE_GYMS,
         RECEIVE_COMMENTS,
         SET_LANGUAGE } from '../constants/ActionTypes'

import fetch from 'isomorphic-fetch'

export function switchToAdd() {
  return { type: ACTIVATE_ADD_MODE}
}

export function switchToViz() {
  return { type: ACTIVATE_VIZ_MODE}
}

export function requestGyms() {
  return {
    type: REQUEST_GYMS
  }
}

export function displayGymInfos(gym) {
  return {
    type: DISPLAY_GYM_INFO,
    data: gym
  }
}

export function receiveGyms(json) {
  return {
    type: RECEIVE_GYMS,
    gyms: json
  }
}


export function fetchGyms() {
  return function(dispatch) {
    dispatch(requestGyms());
    return fetch('/api/gyms').then(response => response.json())
                 .then(json => {
                  dispatch(receiveGyms(json));
                 });
  }
}


export function updateNewGymCoord(coord) {
  return {
    type: UPDATE_NEW_GYM_COORD,
    data: coord
  }
}


export function addGym(body) {
  return function(dispatch) {
    dispatch(switchToViz());
    return fetch('/api/gyms', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(() => {
      dispatch(fetchGyms());
    })
  }
}


export function switchToAddComment() {
  return { type: ACTIVATE_ADD_COMMENT_MODE}
}

export function receiveComments(json) {
  return {
    type: RECEIVE_COMMENTS,
    data: json
  }
}

export function fetchComments(gid) {
  if(gid) {
    return function(dispatch) {
      return fetch('/api/comments/' + gid).then(response => response.json()).then(json => {
        dispatch(receiveComments(json));
       });
    }
  }
  else {
    return function(dispatch) {
      return dispatch(receiveComments());
    }
  }
}

export function addComment(body) {
  return function(dispatch) {
    dispatch(switchToViz());
    return fetch('/api/comments/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(() => {
      dispatch(fetchComments(body.gym_id));
    })
  }
}

export function setLanguage(language) {
  return { type: SET_LANGUAGE, language}
}



