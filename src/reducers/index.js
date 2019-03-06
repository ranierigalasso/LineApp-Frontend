import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import successReducer from './successReducer';

export default combineReducers({
  alert: alertReducer,
  success: successReducer
})