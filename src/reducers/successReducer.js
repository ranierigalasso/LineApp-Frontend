import { actions } from '../actions';

export default (state = '', action) => {
  switch(action.type) {
    case actions.SUCCESS:
      return action.payload;
    default:
      return state;
  }
}