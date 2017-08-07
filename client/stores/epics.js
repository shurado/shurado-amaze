import { combineEpics } from 'redux-observable';

import { 
  getProfileEpic,
  editProfileEpic,
  signoutEpic
} from './User/modules';

import {
  fetchURLEpic
} from './Services/modules';

import {
  createFeedEpic
} from './Feed/modules';

export default combineEpics(
  getProfileEpic,
  editProfileEpic,
  signoutEpic,
  fetchURLEpic,
  createFeedEpic
)
