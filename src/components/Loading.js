import React from 'react'
import GSAP from 'gsap'
import './scss/loading.scss'

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    props.store.subscribe(() => {
      const loadingElement = document.querySelector('.loading')
      if (loadingElement) {
        GSAP.fromTo('.loading',{opacity: 1 },{opacity: 0, duration: 0.15})
      }
    })
  }

  componentDidMount() {
    GSAP.from('.loading', {opacity: 0, duration: 0.25})
  }

  render() {
    return <div className="loading" />
  }
}