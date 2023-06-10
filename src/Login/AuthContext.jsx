import React, { useContext, useEffect, useState } from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { app } from '../index'
import { getAuth } from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth () {
  return useContext(AuthContext)
}

export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = getAuth(app).onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    // const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //   setCurrentUser(user);
    //   setLoading(false);
    // });

    return unsubscribe
  }, [])

  const value = {
    currentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
