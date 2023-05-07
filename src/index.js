import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbs = getFirestore(app);

console.log(db)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

export {app,db,dbs}
