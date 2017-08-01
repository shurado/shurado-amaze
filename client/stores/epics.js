import { combineEpics } from 'redux-observable';

import { 
  getProfileEpic,
  editProfileEpic,
  signoutEpic
} from './User/modules';

export default combineEpics(
  getProfileEpic,
  editProfileEpic,
  signoutEpic,
)
