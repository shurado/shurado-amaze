import { createAction } from 'redux-actions';
import { Observable } from 'rxjs'; 
import * as API from './endpoints';
import { checkAjaxResponse, handleAjaxError } from '../api';

export const CREATE_FEED_REQUEST = 'feed/CREATE_FEED_REQUEST';
export const CREATE_FEED_SUCCESS = 'feed/CREATE_FEED_SUCCESS';
export const CREATE_FEED_FAIL    = 'feed/CREATE_FEED_FAIL';
export const CREATE_FEED_TIMEOUT = 'feed/CREATE_FEED_TIMEOUT';
export const CLEAR_INPUT         = 'feed/CLEAR_INPUT';
export const FETCH_LASTEST_FEED  = 'feed/FETCH_LASTEST_FEED';
export const CANCEL_CREATE_FEED  = 'feed/CANCEL_CREATE_FEED';

const initialState = {
  feedId: '',
  isCreating: false,
  caption: '',
  title: '',
  image_url: '',
  hasImage: false,
  success: false,
  error: null,
};

export default function feed(state = initialState, action) {

  switch (action.type) {
    case CREATE_FEED_REQUEST:
      return {
        ...state,
        isCreating: true
      }
    case CREATE_FEED_SUCCESS:
      return {
        ...initialState,
        feedId: action.feed.id,
        success: true,

      }
    case CREATE_FEED_TIMEOUT:
      return {
        ...state,
        isCreating: false,
        error: '連線請求逾時，請稍後再試'
      }
    case CLEAR_INPUT:
      return initialState

    case FETCH_LASTEST_FEED:
      // fetch lastest feed.
      return {
        ...state,
        success: false
      }
    case CREATE_FEED_FAIL:
      return {
        ...initialState,
        error: action.payload
      }
  }

  return state;
}

export const createFeedRequest = createAction(CREATE_FEED_REQUEST);
export const fetchLastestFeed  = createAction(FETCH_LASTEST_FEED);

export const createFeedEpic = action$ => {
  const DEFAULT_TIMEOUT = 20000;
  return action$.ofType(CREATE_FEED_REQUEST)
    .switchMap(action => {
      return API.addNewFeed(action.payload)
        .map(checkAjaxResponse)
        .map(({ feed }) => ({ type: CREATE_FEED_SUCCESS, feed }))
        .race(
          Observable.timer(DEFAULT_TIMEOUT).mapTo({
            type: CREATE_FEED_TIMEOUT
          })

        )
        .catch(handleAjaxError(CREATE_FEED_FAIL))
    })
};
