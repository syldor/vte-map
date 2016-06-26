import { ACTIVATE_ADD_MODE, ACTIVATE_VIZ_MODE } from '../constants/ActionTypes'
import fetch from 'isomorphic-fetch'


export function switchToAdd() {
  return { type: ACTIVATE_ADD_MODE,  mode: "ADD"}
}

export function switchToViz() {
  return { type: ACTIVATE_VIZ_MODE,  mode: "VIZ"}
}

export const REQUEST_GYMS = 'REQUEST_GYMS'

export function requestGyms() {
  return {
    type: REQUEST_GYMS
  }
}

export const DISPLAY_GYM_INFO = 'DISPLAY_GYM_INFO'

export function displayGymInfos(gym) {
  return {
    type: DISPLAY_GYM_INFO,
    data: gym
  }
}

export const RECEIVE_GYMS = 'RECEIVE_GYMS'

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

export const UPDATE_NEW_GYM_COORD = 'UPDATE_NEW_GYM_COORD'

export function updateNewGymCoord(coord) {
  return {
    type: UPDATE_NEW_GYM_COORD,
    data: coord
  }
}

export const SEND_ADD_GYM = 'SEND_ADD_GYM'


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

