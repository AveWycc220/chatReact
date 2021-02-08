import React from 'react'
import Button from './Button'
import Input from './Input'
import GSAP from 'gsap'
import '../scss/LoginPage/form.scss'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoginForm: props.store.getState().wasLogin, isSignInForm: false, errorMessage: undefined }
    this.logOrSignInClick = this.logOrSignInClick.bind(this)
    this.submitClick = this.submitClick.bind(this)
    this.enterPress = this.enterPress.bind(this)
  }

  // Events

  logOrSignInClick(type, form = false) {
    return function () {
      const duration = this.props.authTimeoutDuration
      this._opacityAnimation(duration)
      this.logOrSignInClickTimeoit = setTimeout(() => {
        this.setState(() => {
          return {isLoginForm: type === 'login', isSignInForm: type === 'signIn', errorMessage: undefined}
        })
        clearTimeout(this.logOrSignInClickTimeoit)
      }, duration * 1000)
      if (form) {
        const formInputs = {
          email: document.querySelector('#email'),
          password: document.querySelector('#password'),
          username: document.querySelector('#username')
        }
        this._inputsToDefault(formInputs)
      }
    }.bind(this)
  }

  submitClick() {
    const info = this._getInfo()
    if (this.state.isLoginForm) {
      if (info.email && info.password) {
        const duration = 0.2
        this.props.store.getState().api.logIn(info.email, info.password)
        this.props.store.subscribe(() => {
          if (this.props.store.getState().auth) {
            this._opacityAnimation(duration, true)
          }
        })
        const infoInputs = {
          email: document.querySelector('#email'),
          password: document.querySelector('#password'),
          username: document.querySelector('#username')
        }
        infoInputs.email.focus()
      } else {
        this._inputsToRed(info)
      }
    } else if (this.state.isSignInForm) {
      if (info.email && info.password && info.username) {
        const duration = 0.2
        this._opacityAnimation(duration)
        this.signInTimeout = setTimeout(() => {
          this.props.store.getState().api.signIn(info.email, info.password, info.username)
          const infoInputs = {
            email: document.querySelector('#email'),
            password: document.querySelector('#password'),
            username: document.querySelector('#username')
          }
          infoInputs.email.focus()
          this._clearInputs(infoInputs)
          this._inputsToDefault(infoInputs)
          this.setState(() => {
            return {isLoginForm: true, isSignInForm: false}
          })
          clearTimeout(this.signInTimeout)
        }, duration * 1000)
      } else {
        this._inputsToRed(info)
      }
    }
  }

  enterPress(e) {
    if (e.key === 'Enter' && !this.state.isLoginForm && !this.state.isSignInForm) {
      this.logOrSignInClick('login')()
    } else if (e.key === 'Enter' && (this.state.isLoginForm || this.state.isSignInForm)) {
      this.submitClick()
    }
  }

  // Lifecycle

  componentDidMount() {
    this.unsubscribeError = this.props.store.subscribe(() => {
        this.setState((state, props) => { return { errorMessage: props.store.getState().errorForm }})
    })
    GSAP.from('.form', {opacity: 0, duration: 0.75})
  }

  componentWillUnmount() {
    if (this.opacityTimeout) { clearTimeout(this.opacityTimeout) }
    this.unsubscribeError()
  }

  _opacityAnimation(duration, withoutAppear=false) {
    GSAP.fromTo('.form', {opacity: 1}, {opacity: 0, duration: duration})
    if (!withoutAppear) {
      this.opacityTimeout = setTimeout(() => {
        GSAP.fromTo('.form', {opacity: 0}, {opacity: 1, duration: duration})
        clearTimeout(this.opacityTimeout)
      }, duration * 1000)
    }
  }

  _getInfo() {
    return {
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
      username: this.state.isSignInForm ? document.querySelector('#username').value : undefined
    }
  }

  _inputsToRed(info) {
    if (!info.email) { GSAP.to(`#email`, {borderColor: '#c40021'}) }
    if (!info.password) { GSAP.to(`#password`, {borderColor: '#c40021'}) }
    if (this.state.isSignInForm) {
      if (!info.username) { GSAP.to(`#username`, {borderColor: '#c40021'}) }
    }
  }

  _inputsToDefault(info) {
    for (let elem in info) {
      if (info.hasOwnProperty(elem) && info[elem]) {
        if (!info[elem].value) { info[elem].style.borderColor = '#e0e0e0' }
      }
    }
  }

  _clearInputs(info) {
    for (let elem in info) {
      if (info.hasOwnProperty(elem) && info[elem]) {
        if (info[elem].value) {
          info[elem].value = ''
        }
      }
    }
  }

  _getInfoForm(type) {
    return <div className='form'>
      <h2 className='title'>{type === 'login' ? 'Log In' : 'Sign In'}</h2>
      {this.state.errorMessage ?
        <h3 className='errorMessage'>{this.state.errorMessage}</h3> : '' }
      {type === 'signIn' ? <Input placeholder='UserName'/> : ''}
      <Input placeholder='Email'/>
      <Input placeholder='Password'/>
      <Button type='Submit' onClick={this.submitClick} enterPress={this.enterPress}/>
      {type === 'signIn' ? '' : <Button type='Sign In' onClick={this.logOrSignInClick('signIn', true)}/>}
      {type === 'login' ? '' : <Button type='Log In' onClick={this.logOrSignInClick('login', true)}/>}
    </div>
  }

  render() {
    if (this.state.isLoginForm) {
      return this._getInfoForm('login')
    } else if (this.state.isSignInForm) {
      return this._getInfoForm('signIn')
    }
    return <div className='form'>
      <h2 className='title'>Chat-React</h2>
      <Button type='Log In' onClick={this.logOrSignInClick('login')} enterPress={this.enterPress}/>
      <Button type='Sign In' onClick={this.logOrSignInClick('signIn')}/>
    </div>
  }
}