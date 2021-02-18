import React from 'react'
import GSAP from 'gsap'
import '../scss/LoginPage/input.scss'

export default class Input extends React.Component {
  componentDidMount() {
    document.querySelector(`#${this.props.inputName.toLowerCase()}`)
      .addEventListener('input', this.inputChange.bind(this))
  }

  componentWillUnmount() {
    document.querySelector(`#${this.props.inputName.toLowerCase()}`)
      .removeEventListener('input', this.inputChange.bind(this))
  }

  inputChange(e) {
    let lengthInput = e.target.value.length
    if (lengthInput !== 0) {
      GSAP.to(`#${e.target.id}`, {borderColor: '#04bc00', duration: 0.15})
    } else {
      GSAP.to(`#${e.target.id}`, {borderColor: '#c40021', duration: 0.15})
    }
  }

  render() {
    return <input
      autoComplete={this.props.inputName === 'Password' ? 'on' : ''}
      type={this.props.inputName.toLowerCase()}
      placeholder={this.props.inputName}
      id={this.props.inputName.toLowerCase()}
      className='input-form'
      maxLength={35}
    />
  }
}