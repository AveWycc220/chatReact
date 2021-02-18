import React from 'react'
import './scss/error.scss'

export default class Error extends React.Component {
  render() {
    return <div className='error'>
      {this.props.errorInfo}
    </div>
  }
}