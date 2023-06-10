import React from 'react'

// import styles from './Calendar.module.css'
import { Card } from 'antd'

const MonthCard = ({ data }) => {
  return (data &&
    <Card>
      <Card.Meta
        title={data.month}
        description={data.goal}
      />
    </Card>)
}

export default MonthCard
