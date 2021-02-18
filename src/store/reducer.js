function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN': return { ...state, auth: true, errorForm: undefined }
    case 'SIGN_IN': return { ...state, errorForm: undefined }
    case 'CONNECTION_OPENED': return { ...state, connectionOpened:true }
    case 'WRONG_EMAIL_OR_PASSWORD': return { ...state, errorForm: 'Wrong Email or Password' }
    case 'ALREADY_EXIST': return { ...state, errorForm: 'User with this Email is already exist' }
    case 'SERVER_ERROR': return { ...state, errorServer: action.value }
    default: return state
  }
}

export default reducer