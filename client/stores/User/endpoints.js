import fecth from 'isomorphic-fetch';
import { checkResponse } from '../api.js';

/* [TODO] return Observable using rx-dom */

export const fetchProfileById = (userId) => {
  return fetch(`/api/user/${userId}/profile`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(checkResponse)
    
    
}

export const editProfile = (userId, inputFields) => {
  return fetch(`/api/user/${userId}/profile`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(inputFields),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(checkResponse)
}

export const signout = () => {
  return fetch('/api/user/sign_out', {
    method: 'POST',
    credentials: 'include'
  }).then(res => res.json())
}
