import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';
import { checkAjaxResponse } from '../api';

export const FETCH_URL_REQUEST = 'services/FETCH_URL_REQUEST';
export const FETCH_URL_SUCCESS = 'services/FETCH_URL_SUCCESS';
export const FETCH_URL_FAIL    = 'services/FETCH_URL_FAIL';

const initialState = {
  isLoading: false,
  url: null
}

export default function service(state = initialState, action) {
  switch (action.type) {
    case FETCH_URL_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_URL_SUCCESS:
      return {
        ...state,
        error: '', // clear all error.
        isLoading: false,
        url: action.meta,
      }
    case FETCH_URL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
  }

  return state;
}

export const fetchURLRequest = createAction(FETCH_URL_REQUEST);

export const fetchURLEpic = action$ => {
  return action$.ofType(FETCH_URL_REQUEST)
    .debounceTime(1500)  
    .switchMap(action => {
      return ajax({ url: '/api/parse', method: 'POST', withCredentials: true, body: { url: action.payload } })
        .map(checkAjaxResponse)
        .map((res) => ({
          type: FETCH_URL_SUCCESS,
          meta: res
        }))
        .catch(({ xhr }) => Observable.of({
          type: FETCH_URL_FAIL,
          payload: xhr.response.error
        }))
    })
}
