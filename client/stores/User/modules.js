import { createAction } from 'redux-actions';
import * as api from './endpoints';
import { Observable } from 'rxjs'; /* [TODO] remove rxjs to use rx-dom */
import { DOM } from 'rx-dom';

export const FETCH_PROFILE_REQUEST   = 'user/FETCH_PROFILE_REQUEST';
export const FETCH_PROFILE_CANCELLED = 'user/FETCH_PROFILE_CANCELLED';
export const FETCH_PROFILE_SUCCESS   = 'user/FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAIL      = 'user/FETCH_PROFILE_FAIL';
export const INIT_USER_INFO          = 'user/INIT_USER_INFO';

export const EDIT_PROFILE            = 'user/EDIT_PROFILE';
export const EDIT_PROFILE_SUCCESS    = 'user/EDIT_PROFILE_SUCCESS';
export const EDIT_PROFILE_ERROR      = 'user/EDIT_PROFILE_ERROR';

export const SIGNOUT_REQUEST         = 'user/SIGNOUT_REQUEST';
export const SIGNOUT_SUCCESS         = 'user/SIGNOUT_SUCCESS';
export const SIGNOUT_CANCELLED       = 'user/SIGNOUT_CANCELLED';

const initialState = {
  isFetching: false,
  jwtToken: '', 
  userId: '',
  isLoggedIn: false,
  profile: {}
}

export default function user(state = initialState, action) {
  switch(action.type) {
    case INIT_USER_INFO:
      return {
        ...state,
        jwtToken: action.payload.jwt_token,
        userId: action.payload.userId,
        isLoggedIn: action.payload.isLoggedIn,
      }
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        profile: action.profile
      }
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false
      }
    case EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
      }
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false
      }
  }

  return state;
}

export const initUserInfo        = createAction(INIT_USER_INFO);
export const fetchProfileRequest = createAction(FETCH_PROFILE_REQUEST);
export const editProfile         = createAction(EDIT_PROFILE);
export const signoutRequest      = createAction(SIGNOUT_REQUEST);

export const signoutEpic = (action$) => {
  return action$
    .ofType(SIGNOUT_REQUEST)
    .mergeMap((action) => 
      Observable.fromPromise(api.signout())
        .map(res => ({
          type: SIGNOUT_SUCCESS,
          res,
        }))
        .takeUntil(action$.ofType())
    );

}

export const getProfileEpic = (action$) => {
  return action$
    .ofType(FETCH_PROFILE_REQUEST)
    .mergeMap(action => Observable.fromPromise(api.fetchProfileById(action.payload)))
    .map(profile => ({
      type: FETCH_PROFILE_SUCCESS,
      ...profile
    }))


}

export const editProfileEpic = (action$) => {
  return action$
    .ofType(EDIT_PROFILE)
    .mergeMap(action => {
      return Observable.fromPromise(api.editProfile(action.payload.id, action.payload))
        .map(res => {
          if (res.errors) { throw Error(res.errors); }
          return res;
        })

    })
    .map(profile => ({
      type: EDIT_PROFILE_SUCCESS,
      ...profile
    }))
    .catch(error => Observable.of({
      type: EDIT_PROFILE_ERROR,
      error
    }))

}