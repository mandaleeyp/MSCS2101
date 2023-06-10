import React from 'react'

import styles from './MonthCard.module.css'
import { Card } from 'antd'

const monthMappings = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sep',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec'
}

const MonthCard = ({ data }) => {
  return (data &&
    <Card className={styles.card}>
      <Card.Meta
        title={
          <div className={styles.cardTitle}>
            <span>
              <div className={styles.month}>{monthMappings[data.month]}</div>
              <div>{data.year}</div>
            </span>
            <span>
              <span className={styles.goal}><span className={styles.dollar}>$</span>{data.savingsGoal}</span>
              <div className={styles.subtext}>Goal</div>
            </span>
            <span>
              <span className={styles.goal}><span className={styles.dollar}>$</span>{data.availableFunds}</span>
              <div className={styles.subtext}>Total budget</div>
            </span>
          </div>
        }
      />
    </Card>)
}

export default MonthCard
