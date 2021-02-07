function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN': return { ...state, auth: true }
    case 'CONNECTION_OPENED': return { ...state, connectionOpened:true }
    default: return state
  }
}

export default reducer