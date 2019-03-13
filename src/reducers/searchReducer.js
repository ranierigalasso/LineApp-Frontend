import { actions } from '../actions';

export default (state = null, action) => {
  switch(action.type) {
    case actions.FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
}

