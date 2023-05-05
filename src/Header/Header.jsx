import React, { useContext } from 'react'
import { Tag } from 'antd'

import styles from './Header.module.css'

const Header = ({ title, description }) => {

  return (
    <div className={styles.header}>
        <div className={styles.welcome}>Welcome, Wilson Family!</div>
        <div className={styles.title}>{title}</div>
        <div className={styles.statistic}><span className={styles.dollar}>$</span>2133 / 2313 <span className={styles.subtext}>spent so far</span></div>
    </div>
  )
}

export default Header
