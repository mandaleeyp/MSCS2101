import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: 'AIzaSyCdAs7g_plkWJbSiogA-1ACS9Vz616WIHY',
  authDomain: 'budget-buddy-18354.firebaseapp.com',
  projectId: 'budget-buddy-18354',
  storageBucket: 'budget-buddy-18354.appspot.com',
  messagingSenderId: '409312370584',
  appId: '1:409312370584:web:c87ae4dcd0fc572b2bd5ed',
  measurementId: 'G-6T2T3JL1NW'
}

export function getFirebaseDb () {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  return db
}
