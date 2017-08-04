import { combineEpics } from 'redux-observable';

import { 
  getProfileEpic,
  editProfileEpic,
  signoutEpic
} from './User/modules';

import {
  fetchURLEpic
} from './Services/modules';

export default combineEpics(
  getProfileEpic,
  editProfileEpic,
  signoutEpic,
  fetchURLEpic,
)
