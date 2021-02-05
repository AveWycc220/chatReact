import React from 'react'
import '../scss/LoginPage/button.scss'

export default class Button extends React.Component {
 render() {
   return <button
     className={this.props.type.replace(' ', '-').toLowerCase() + '-btn'}
     onClick = {this.props.onClick}
   >
     {this.props.type}
   </button>
 }
}