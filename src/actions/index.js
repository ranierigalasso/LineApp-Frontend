export const actions = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS'
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