import React, { useState, useEffect } from 'react'
import './App.scss'
import Loading from './components/Loading'
import Form from './components/LoginPage/Form'
import Error from './components/Error'
import MainPage from './components/ChatPage/MainPage'

export default function App(props) {
  const [connectionOpened, setConnectionOpened] = useState(props.store.getState().connectionOpened)
  const [isAuthorized, setIsAuthorized] = useState(props.store.getState().auth)
  const [errorServer, setErrorServer] = useState(props.store.getState().errorServer)
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
    setErrorServer(props.store.getState().errorServer)
  })

  useEffect(() => {
    return () => { if (typeof unsubscribe === 'function') { unsubscribe() } }
  })

  return (
    <>
      {connectionOpened ? (
        <div className="App">
          {isAuthorized ? <MainPage store={props.store}/> : <Form store={props.store} authTimeoutDuration={authTimeoutDuration} /> }
        </div>
      ) : (
        errorServer ? <Error errorInfo={props.store.getState().errorServer}/> : <Loading store={props.store}/>
      )}
    </>
  )
}