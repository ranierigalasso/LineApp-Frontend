import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import successReducer from './successReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  alert: alertReducer,
  success: successReducer,
  searchFetch: searchReducer,
})