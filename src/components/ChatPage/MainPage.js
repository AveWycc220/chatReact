import React from 'react'
import Header from './Header'
import GSAP from 'gsap'
import '../scss/ChatPage/main_page.scss'

export default class MainPage extends React.Component {
  componentDidMount() {
    GSAP.from('.main-page', {opacity: 0, duration: 0.5})
  }

  render() {
    return <div className="main-page">
      <Header store={this.props.store}/>
    </div>
  }
}