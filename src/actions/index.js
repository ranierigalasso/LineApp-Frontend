export const actions = {
  ERROR: 'ERROR'
}

export const callAlert = (message) => {
  return {
    type: 'ERROR',
    payload: message,
  }
}