import React from 'react'

import styles from './Header.module.css'

const Header = ({ title, statistic, dropdown }) => {
  return (
    <div className={styles.header}>
      <div className={styles.column}>
        <div className={styles.welcome}>Welcome!</div>
        <div className={styles.title}>{title}</div>
        {statistic && <div className={styles.statistic}><span className={styles.dollar}>$</span>2133 / 2313 <span className={styles.subtext}>spent so far</span></div>}
      </div>
      <div className={styles.dropdown}>
        {dropdown}
      </div>
    </div>
  )
}

export default Header
