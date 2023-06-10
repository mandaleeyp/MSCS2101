import React, { useState } from 'react'
import { app } from '../index'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'
import { getFirebaseDb } from '../Utils/getDatabase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { message } from 'antd'
import familyPhoto from '../images/family-icon.svg'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)

  const navigate = useNavigate()

  const addNewUser = async (userCredential) => {
    try {
      const db = getFirebaseDb()
      const newUser = doc(collection(db, 'users'))
      await setDoc(newUser, {
        email: userCredential.user.email,
        familyId: userCredential.user.uid
      })
    } catch (error) {
      console.error('Error adding new user:', error)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const auth = getAuth(app)
      if (isSignup) {
        if (password.length < 6) {
          alert('Password must be at least 6 characters long')
          return
        }
        try {
          await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log('userCredential: ', userCredential)
            addNewUser(userCredential)
          })
          console.log('User created successfully!')
          navigate('/family-profile', { message: 'User created successfully!' })
        } catch (error) {
          message.error('Error signing up: ', error)
          console.error('Error signing up:', error)
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        console.log('User logged in successfully!')
        navigate('/success', { message: 'User logged in successfully!' })
      }
      navigate('/')
    } catch (error) {
      console.error('Error signing up/in:', error)
      if (error.code === 'auth/wrong-password') {
        alert('Wrong password')
      } else {
        alert('Error signing in')
        console.error('Error signing up/in:', error)
        console.log(app)
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img className={styles.icon} src={familyPhoto} alt='family' />
        <div className={styles.appName}>Budget Buddy</div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div>
            <label className={styles.label} htmlFor='email'>Email:</label>
            <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className={styles.label} htmlFor='password'>Password:</label>
            <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='signup'>Sign Up?</label>
            <input type='checkbox' id='signup' checked={isSignup} onChange={(e) => setIsSignup(e.target.checked)} />
          </div>
          <button className={styles.submit} type='submit'>{isSignup ? 'Sign Up' : 'Log In'}</button>
        </form>
      </div>
    </div>
  )
}

export default Login
