import React, { useState, useEffect } from 'react'
import './App.scss'
import Loading from './components/Loading'
import Form from './components/LoginPage/Form'
import GSAP from 'gsap'

export default function App(props) {
  const [connectionOpened, setConnectionOpened] = useState(props.store.getState().connectionOpened)
  const [isAuthorized, setIsAuthorized] = useState(props.store.getState().auth)

  props.store.subscribe(() => {
    const connectionOpenedTimeout = setTimeout(() => {
      setConnectionOpened(props.store.getState().connectionOpened)
      clearTimeout(connectionOpenedTimeout)
    }, 150)
    const authTimeout = setTimeout(() => {
      setIsAuthorized(props.store.getState().auth)
      clearTimeout(authTimeout)
    }, 200)
  })

  useEffect(() => {
    const appElem = document.querySelector('.App')
    if (appElem) {
      GSAP.fromTo('.App', {opacity: 0}, {opacity: 1, duration: 0.35})
    }
  })

  return (
    <>
      {connectionOpened ? (
        <div className="App">
          {isAuthorized ?  <p>MainPage</p> : <Form store={props.store} /> }
        </div>
      ) : (
        <Loading store={props.store}/>
      )}
    </>
  );
}