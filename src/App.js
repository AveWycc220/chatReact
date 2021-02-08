import React, { useState, useEffect } from 'react'
import './App.scss'
import Loading from './components/Loading'
import Form from './components/LoginPage/Form'

export default function App(props) {
  const [connectionOpened, setConnectionOpened] = useState(props.store.getState().connectionOpened)
  const [isAuthorized, setIsAuthorized] = useState(props.store.getState().auth)
  const authTimeoutDuration = 0.2

  const unsubscribe = props.store.subscribe(() => {
    const connectionOpenedTimeout = setTimeout(() => {
      setConnectionOpened(props.store.getState().connectionOpened)
      clearTimeout(connectionOpenedTimeout)
    }, 150)
    const authTimeout = setTimeout(() => {
      setIsAuthorized(props.store.getState().auth)
      clearTimeout(authTimeout)
    }, authTimeoutDuration * 1000)
  })

  useEffect(() => {
    return () => { unsubscribe() }
  })

  return (
    <>
      {connectionOpened ? (
        <div className="App">
          {isAuthorized ?  <p>MainPage</p> : <Form store={props.store} authTimeoutDuration={authTimeoutDuration} /> }
        </div>
      ) : (
        <Loading store={props.store}/>
      )}
    </>
  );
}