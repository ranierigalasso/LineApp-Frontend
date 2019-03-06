import { actions } from '../actions';

export default (state = '', action) => {
  switch(action.type) {
    case actions.ERROR:
      return action.payload;
    default:
      return state;
  }
}