import Cookie from 'js-cookie'
import store from '../store/store'

export default class API {
  constructor(url) {
    this.messageList = []
    try {
      this.socket = new WebSocket(url)
      this.socket.onopen = function () {
        store.dispatch({type: 'CONNECTION_OPENED'})
      }
      this.socket.onclose = function (e) {
        store.dispatch({
          type: 'SERVER_ERROR', value: `CODE = ${e.code} | REASON = ${e.reason}
        CONNECTION CLOSED`
        })
      }
      this.socket.onerror = function (e) {
        store.dispatch({type: 'SERVER_ERROR', value: `MESSAGE = ${e.message}`})
      }
    } catch (e) {
      store.dispatch({type: 'SERVER_ERROR', value: `ERROR = ${e}`})
    }
  }

  signIn(email, password, username) {
    const obj = {
      command: 'user_create',
      name: username,
      email: email,
      password: password
    }
    this.socket.send(JSON.stringify(obj))
    this.socket.onmessage = function (e) {
      const res = JSON.parse(e.data)
      if (res.status === 1) {
        store.dispatch({type: 'SIGN_IN'})
      } else {
        store.dispatch({type: 'ALREADY_EXIST'})
      }
    }
  }

  logIn(email, password) {
    const obj = {
      command: 'user_login',
      email: email,
      password: password,
    }
    this.socket.send(JSON.stringify(obj))
    this.socket.onmessage = function (e) {
      const {name, status, user_key} = JSON.parse(e.data)
      if (status === 1) {
        Cookie.set('user_key', user_key, {path: '/', expires: 7})
        Cookie.set('name', name, {path: '/', expires: 7})
        Cookie.set('wasLogin', '1', {path: '/', expires: 14})
        store.dispatch({type: 'LOGIN'})
      } else {
        store.dispatch({type: 'WRONG_EMAIL_OR_PASSWORD'})
      }
    }
  }

  logOut() {
    const obj = {
      command: 'user_exit',
      user_key: Cookie.get('id')
    }
    this.socket.send(JSON.stringify(obj))
    this.socket.onmessage = function (e) {
      if (JSON.parse(e.data).status === 1) {
        store.dispatch({type: 'LOGOUT'})
        Cookie.remove('id')
        Cookie.remove('name')
      } else {
        store.dispatch({type: 'SERVER_ERROR', value: `ERROR = ${JSON.parse(e.data).message}`})
      }
    }
  }

//TODO SEND, GETMASSGELIST, DELETE, EDIT

/*  send(message) {
    const obj = {
      command: 'message_create',
      message: message,
      time: Date.now(),
      user_key: this.cookie.getCookie('id')
    }
    this.socket.send(JSON.stringify(obj))
    this.socket.onmessage = function(e) {
      const res = JSON.parse(e.data)
      if (res.status === 0) {
        this.cookie.delete('id')
        this.cookie.delete('name')
        this.router.redirectToLogin()
      }
    }.bind(this)
  }

  getMessageList() {
    const obj = {
      command: 'messages_read',
      start: 0,
      end: 100
    }
    this.socket.send(JSON.stringify(obj))
    this.socket.onmessage = function(e) {
      const res = JSON.parse(e.data)
      if (res.status === 1) {
        this.messageList = res.messages.reverse()
        const messageListEvent = this.eventHandler.getCreateMessageListEvent()
        document.dispatchEvent(messageListEvent)
      }
    }.bind(this)
  }

  logout() {
    const obj = {
      command: 'user_exit',
      user_key: this.cookie.getCookie('id')
    }
    this.socket.send(JSON.stringify(obj))
    this.cookie.delete('id')
    this.cookie.delete('name')
    this.router.redirectToLogin()
  }

  delete(id) {
    const obj = {
      command: 'message_del',
      id: id,
      user_key: this.cookie.getCookie('id')
    }
    this.socket.send(JSON.stringify(obj))
    this.socket.onmessage = function(e) {
      const res = JSON.parse(e.data)
      if (res.status === 0) {
        console.log(`Wrong ID`)
      }
    }.bind(this)
  }

  edit(id, messageText) {
    const obj = {
      command: 'message_edit',
      id: id,
      message: messageText,
      user_key: this.cookie.getCookie('id')
    }
    this.socket.send(JSON.stringify(obj))
    this.socket.onmessage = function(e) {
      const res = JSON.parse(e.data)
      if (res.status === 0) {
        console.log(`Wrong ID`)
      }
    }.bind(this)
  }

  _listenCommand() {
    this.socket.addEventListener('message', e => {
      const res = JSON.parse(e.data)
      if (process.env.MODE === 'DEV') {
        console.log('Listener : ')
        console.log(res)
        console.log(res.command)
      }
      if (res.command === 'message_del' && res.status === 1) {
        this._deleteMessage(res)
        const deleteEvent = this.eventHandler.getDeleteMessageEvent()
        document.dispatchEvent(deleteEvent)
      } else if (res.command === 'message_create' && res.status === 1) {
        this._addMessage(res)
        const sendEvent = this.eventHandler.getSendMessageEvent()
        document.dispatchEvent(sendEvent)
      } else if (res.command === 'message_edit' && res.status === 1) {
        this._editMessage(res)
        const editEvent = this.eventHandler.getEditMessageEvent()
        document.dispatchEvent(editEvent)
      }
    })
  }

  _deleteMessage(message) {
    this.messageList.some((item, i) => {
      if (+item.id === +message.id) {
        delete this.messageList[i]
        this.messageList = this.messageList.filter((elem) => Boolean(elem))
        return true
      }
    })
  }

  _addMessage(message) {
    this.messageList.push(message)
  }

  _editMessage(message) {
    this.messageList.some((item, i) => {
      if (+this.messageList[i].id === +message.id) {
        this.messageList[i].message = message.message
        return true
      }
    })
  }*/
}