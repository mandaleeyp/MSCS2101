import React from 'react'
import LoginPage from './LoginPage'; // import the LoginPage component
import styles from './Account.module.css'; // import styles from './Account.module.css'
import MenuWrap from '../Menu/MenuWrap'

const Account = () => {
  return (
    <MenuWrap route='/account'>
      <div className={styles.loginContainer}>
        <LoginPage /> {/* render the LoginPage component */}
      </div>
    </MenuWrap>

  )
}

export default Account
