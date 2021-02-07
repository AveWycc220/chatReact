import React from 'react'
import '../scss/LoginPage/button.scss'

export default class Button extends React.Component {
  componentDidMount() {
    document.querySelector(`.${this.props.type.replace(' ', '-').toLowerCase() + '-btn'}`)
      .addEventListener('click', this.props.onClick)
    if (this.props.type === 'Log In') {
      document.addEventListener('keydown', this.props.enterPress)
    } else if (this.props.type === 'Submit') {
      document.addEventListener('keydown', this.props.enterPress)
    }
  }

  componentWillUnmount() {
    document.querySelector(`.${this.props.type.replace(' ', '-').toLowerCase() + '-btn'}`)
      .removeEventListener('click', this.props.onClick)
    if (this.props.type === 'Log In') {
      document.removeEventListener('keydown', this.props.enterPress)
    } else if (this.props.type === 'Submit') {
      document.removeEventListener('keydown', this.props.enterPress)
    }
  }

  render() {
   return <button
     className={this.props.type.replace(' ', '-').toLowerCase() + '-btn'}
   >
     {this.props.type}
   </button>
 }
}