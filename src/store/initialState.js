import API from '../api/api'
import Cookie from 'js-cookie'

const initialState = {
  api: new API(`ws://127.0.0.1:5025`),
  auth: !!(Cookie.get('name') && Cookie.get('user_key')),
  wasLogin: !!Cookie.get('wasLogin'),
  connectionOpened: false,
  errorForm: undefined,
  errorServer: undefined,
}

export default initialState