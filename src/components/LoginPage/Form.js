import React from 'react'
import Button from './Button'
import Input from './Input'
import GSAP from 'gsap'
import '../scss/LoginPage/form.scss'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoginForm: props.store.getState().wasLogin, isSignInForm: false }
    this.loginClick = this.loginClick.bind(this)
    this.signInClick = this.signInClick.bind(this)
    this.submitClick = this.submitClick.bind(this)
  }

  loginClick() {
    let duration = 0.15
    GSAP.fromTo('.form', {opacity: 1}, {opacity: 0, duration: duration})
    setTimeout(()=> {
      this.setState(() => {
        return { isLoginForm: true, isSignInForm: false }
      })
    }, duration * 1000)
  }

  signInClick() {
    let duration = 0.15
    GSAP.fromTo('.form', {opacity: 1}, {opacity: 0, duration: 0.25})
    setTimeout(()=> {
      this.setState(() => {
        return { isSignInForm: true, isLoginForm: false }
      })
    }, duration * 1000)
  }

  logOrSignInClick(type) {
    let duration = 0.15
        GSAP.fromTo('.form', {opacity: 1}, {opacity: 0, duration: duration})
        setTimeout(()=> {
          this.setState(() => {
            return { isLoginForm: type === 'login', isSignInForm: false }
          })
        }, duration * 1000)
    }

  submitClick() {
    const info = {
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
      username: this.state.isSignInForm ? document.querySelector('#username').value : undefined
    }
    if (this.state.isLoginForm) {
      if (info.email && info.password) {
        this.props.store.getState().api.logIn(info.email, info.password)
      } else {
        !info.email ? GSAP.to(`#email`, {borderColor: '#c40021'}) : GSAP.to(`#password`, {borderColor: '#c40021'})
      }
    } else if (this.state.isSignInForm) {
      this.props.store.getState().api.signIn()
    }
  }

  componentDidMount() {
    GSAP.from('.form', {opacity: 0, duration: 0.75})
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    GSAP.fromTo('.form', {opacity: 0}, {opacity: 1, duration: 0.35})
  }

  getInfoForm(type) {
    return <div className='form'>
      <h2 className='title'>{type === 'login' ? 'Log In' : 'Sign In'}</h2>
      {type === 'signIn' ? <Input placeholder='UserName'/> : ''}
      <Input placeholder='Email'/>
      <Input placeholder='Password'/>
      <Button type='Submit' onClick={this.submitClick}/>
      {type === 'signIn' ? '' : <Button type='Sign In' onClick={this.signInClick}/>}
    </div>
  }

  render() {
    if (this.state.isLoginForm) {
      return this.getInfoForm('login')
    } else if (this.state.isSignInForm) {
      return this.getInfoForm('signIn')
    }
    return <div className='form'>
      <h2 className='title'>Chat-React</h2>
      <Button type='Log In' onClick={this.loginClick}/>
      <Button type='Sign In' onClick={this.signInClick}/>
    </div>
  }
}