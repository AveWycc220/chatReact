import React from 'react'

export default class LogOutButton extends React.Component {
  constructor(props) {
    super(props)
    this.event = () => {
      switch (props.type) {
        case 'logout': {
          this.props.store.getState().api.logOut()
          break
        }
        default: break
      }
    }
  }

  componentDidMount() {
    let elem =  document.querySelector(`.${this.props.type}`)
    elem.addEventListener('click', this.event)
    elem.blur()
  }

  componentWillUnmount() {
    document.querySelector(`.${this.props.type}`).removeEventListener('click', this.event)
  }

  render() {
    return <button className={`${this.props.type}`} />
  }
}