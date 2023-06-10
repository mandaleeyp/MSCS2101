// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
// import { saveUserData, getUserData } from '../index'

// // Create new user and save their data to the database
// const handleSignUp = async (email, password, userData) => {
//   try {
//     const { user } = await createUserWithEmailAndPassword(app.auth(), email, password)
//     await saveUserData(user.uid, userData)
//     console.log('User created successfully!')
//   } catch (error) {
//     console.error('Error signing up:', error)
//   }
// }

// // Log in user and retrieve their data from the database
// const handleLogin = async (email, password) => {
//   try {
//     const { user } = await signInWithEmailAndPassword(app.auth(), email, password)
//     const userData = await getUserData(user.uid)
//     console.log('User logged in successfully:', userData)
//   } catch (error) {
//     console.error('Error logging in:', error)
//   }
// }
