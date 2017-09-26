import fetch from 'isomorphic-fetch';
import { ajax } from 'rxjs/observable/dom/ajax';
import { checkResponse } from '../api';

/* [TODO] return Observable using rx-dom */

export const fetchProfileById = userId => ajax({
  url: `/api/user/${userId}/profile`,
  method: 'GET',
  credentials: 'include',
});

/* [TODO] replace with ajax version! */
export const editProfile = (userId, inputFields) => ajax({
  url: `/api/user/${userId}/profile`,
  method: 'POST',
  body: { ...inputFields }
});

export const signout = () => fetch('/api/user/sign_out', {
  method: 'POST',
  credentials: 'include'
}).then(res => res.json())
