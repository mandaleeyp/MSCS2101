import React, { useState } from 'react'
import { Card, Button, Avatar, Tag } from 'antd'
import {
  // DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons'
import AddExpenseModal from './AddExpenseModal'
import { AVATAR_OPTIONS } from '../constants'

import styles from './MonthlyExpenditureList.module.css'

const MonthlyExpenditureList = ({ expenses, currentMonthYear }) => {
  // const [expenses, setExpenses] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  // const handleDelete = (id) => {
  //   const updatedExpenses = expenses.filter((expense) => expense.id !== id)
  //   setExpenses(updatedExpenses)
  // }

  return (
    <div>
      <div className={styles.addExpenseCard}>
        <div className={styles.title}>Add New Expense</div>
        <div className={styles.addExpenseDescription}>To add an expense, input the necessary details such as the expense amount, category, and description.
        </div>
        <Button className={styles.addButton} icon={<PlusOutlined />} type='primary' onClick={showModal}>
          Add New Expense
        </Button>
      </div>
      {expenses.map((expense, i) => (
        <Card
          className={styles.card}
          key={i}
          style={{ marginTop: '20px', border: '3px solid var(--background)' }}
          // extra={
          //   <div className={styles.description}>{expense.description}</div>
          //   // <DeleteOutlined key='delete' />
          // }
        >
          <Card.Meta
            avatar={
              <div className={styles.avatarContainer}>
                <Avatar className={styles.avatar} src={AVATAR_OPTIONS[expense.avatar]} />
                <div className={styles.name}>{expense.spender}</div>
              </div>
}
            title={
              <div className={styles.cardBody}>
                <span>
                  <Tag color='gold' className={styles.tag}>{expense.category}</Tag>
                  <div className={styles.amount}>
                    <span className={styles.dollar}>$</span>{expense.amount}
                  </div>
                  <div className={styles.date}>
                    {expense.date}
                  </div>
                </span>
                <span>
                  {/* <DeleteOutlined key='delete' /> */}
                  <div className={styles.description}>{expense.description}</div>
                </span>
              </div>
            }
          />
        </Card>
      ))}
      <AddExpenseModal currentMonthYear={currentMonthYear} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  )
}

export default MonthlyExpenditureList
