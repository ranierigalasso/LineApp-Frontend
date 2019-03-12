import { searchService } from  '../api/searchService';

export const actions = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  FETCH_USERS: 'FETCH_USERS',
}

export const callAlert = (message) => {
  return {
    type: 'ERROR',
    payload: message,
  }
}

export const callSuccess = (message) => {
  return {
    type: 'SUCCESS',
    payload: message,
  }
}

export const searchUsers = () => dispatch => {
  searchService.get('/search')
    .then((result) => {
      dispatch({
        type: actions.FETCH_USERS,
        payload: result.data
      })
    })
}