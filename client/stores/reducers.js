import { combineReducers } from 'redux';
import user from './User/modules';
import service from './Services/modules';


export default combineReducers({
  user,
  service
});
