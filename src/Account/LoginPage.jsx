import React, { useState } from 'react';
import { app } from '../index';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const auth = getAuth(app);
      if (isSignup) {
        if (password.length < 6) {
          alert('Password must be at least 6 characters long');
          return;
        }
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
          navigate('/dashboard', { message: 'User created successfully!' });
        } catch (error) {
          console.error('Error signing up:', error);
          
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in successfully!');
        navigate('/success', { message: 'User logged in successfully!' });
      }
      navigate('/');
    } catch (error) {
      console.error('Error signing up/in:', error);
      if (error.code === 'auth/wrong-password') {
        alert('Wrong password');
      } else {
        alert('Error signing in');
      console.error('Error signing up/in:', error);
      console.log(app);
      }
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="signup">Sign Up?</label>
        <input type="checkbox" id="signup" checked={isSignup} onChange={(e) => setIsSignup(e.target.checked)} />
      </div>
      <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
    </form>
  );
};

export default LoginPage;
