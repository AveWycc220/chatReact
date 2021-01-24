import React, { useState, useEffect } from 'react'
import './App.scss'
import Loading from './components/Loading'
import Cookie from 'js-cookie'


export default function App() {
  const [loading, setLoading] = useState(true)
  const isAuthorized = !!(Cookie.get('name') && Cookie.get('user_id'))

  useEffect(() => { setLoading(false) }, [])

  return (
    <>
      {loading === false ? (
        <div className="App">
          {isAuthorized ?  <p>MainPage</p> : <p>LoginPage</p> }
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}