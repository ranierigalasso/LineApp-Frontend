import { actions } from '../actions';

export default (state = null, action) => {
  switch(action.type) {
    case actions.FETCH_USERS:
      return action.payload;
    default:
      return state;
  }
}

// import { actions } from '../actions';

// const INITIAL_STATE= {search: ""};

// export default (state = INITIAL_STATE, action) => {
//   switch(action.type) {
//     case actions.FETCH_USERS:
//       return {...state, search: action.payload};
//     default:
//       return state;
//   }
// }