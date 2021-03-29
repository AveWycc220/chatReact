import React from 'react'
import '../scss/ChatPage/header.scss'
import LogOutButton from './LogOutButton'

export default class Header extends React.Component {
  render() {
    return <header className='header'>
      <div className='logo' />
      <LogOutButton type='logout' store={this.props.store} />
    </header>
  }
}