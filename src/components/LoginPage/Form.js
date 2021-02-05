import React from 'react'
import Button from './Button'
import Input from './Input'
import GSAP from 'gsap'
import '../scss/LoginPage/form.scss'

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoginForm: false, isSignInForm: false }
    this.loginClick = this.loginClick.bind(this)
    this.signInClick = this.signInClick.bind(this)
  }

  loginClick() {
    let duration = 0.15
    GSAP.fromTo('.form', {opacity: 1}, {opacity: 0, duration: duration})
    setTimeout(()=> {
      this.setState(() => { return { isLoginForm: true } })
    }, duration * 1000)
  }

  signInClick() {
    let duration = 0.15
    GSAP.fromTo('.form', {opacity: 1}, {opacity: 0, duration: 0.25})
    setTimeout(()=> {
      this.setState(() => { return { isSignInForm: true } })
    }, duration * 1000)
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
      <Button type='Submit'/>
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