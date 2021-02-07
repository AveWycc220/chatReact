import React from 'react'
import Button from './Button'
import Input from './Input'
import GSAP from 'gsap'
import '../scss/LoginPage/form.scss'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoginForm: props.store.getState().wasLogin, isSignInForm: false }
    this.logOrSignInClick = this.logOrSignInClick.bind(this)
    this.submitClick = this.submitClick.bind(this)
    this.enterPress = this.enterPress.bind(this)
  }

  // Events

  logOrSignInClick(type) {
    return function() {
      const duration = 0.15
      GSAP.fromTo('.form', {opacity: 1}, {opacity: 0, duration: duration})
      const changeFormTimeout = setTimeout(() => {
        this.setState(() => {
          return {isLoginForm: type === 'login', isSignInForm: type === 'signIn'}
        })
        clearTimeout(changeFormTimeout)
      }, duration * 1000)
    }.bind(this)
  }

  submitClick() {
    const info = this._getInfo()
    if (this.state.isLoginForm) {
      if (info.email && info.password) {
        this.props.store.getState().api.logIn(info.email, info.password)
        GSAP.fromTo('.form', {opacity: 1}, {opacity: 0, duration: 0.2})
      } else {
        this._inputsToRed(info)
      }
    } else if (this.state.isSignInForm) {
      if (info.email && info.password && info.username) {
        this.props.store.getState().api.signIn(info.email, info.password, info.username)
        const emailInput = document.querySelector('#email')
        const passwordInput = document.querySelector('#password')
        GSAP.fromTo('.form', {opacity: 1}, {opacity: 0, duration: 0.15})
        const changeFormTimeout = setTimeout(() => {
          emailInput.focus()
          emailInput.value = ''
          passwordInput.value = ''
          emailInput.style.borderColor = '#e0e0e0'
          passwordInput.style.borderColor = '#e0e0e0'
          this.setState(() => { return {isLoginForm: true, isSignInForm: false} })
          clearTimeout(changeFormTimeout)
        }, 150)
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
    GSAP.from('.form', {opacity: 0, duration: 0.75})
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    GSAP.fromTo('.form', {opacity: 0}, {opacity: 1, duration: 0.35})
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

  _getInfoForm(type) {
    return <div className='form'>
      <h2 className='title'>{type === 'login' ? 'Log In' : 'Sign In'}</h2>
      {type === 'signIn' ? <Input placeholder='UserName'/> : ''}
      <Input placeholder='Email'/>
      <Input placeholder='Password'/>
      <Button type='Submit' onClick={this.submitClick} enterPress={this.enterPress}/>
      {type === 'signIn' ? '' : <Button type='Sign In' onClick={this.logOrSignInClick('signIn')}/>}
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