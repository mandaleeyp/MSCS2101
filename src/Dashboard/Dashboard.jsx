import React, { useState, useEffect } from 'react'

import styles from './Dashboard.module.css'
import MenuWrap from '../Menu/MenuWrap'
import MonthlyExpenditureList from './MonthlyExpenditureList'
import ExpenditureBreakdown from './ExpenditureBreakdown'
import { Select } from 'antd'
import { getFirebaseDb } from '../Utils/getDatabase'

// Define dummy data for testing
const dummyExpenditures = [
  { id: 1, category: 'Food', amount: 100, spender: 'John' },
  { id: 2, category: 'Transportation', amount: 50, spender: 'Jane' },
  { id: 3, category: 'Shopping', amount: 200, spender: 'John' },
  { id: 4, category: 'Entertainment', amount: 150, spender: 'Jane' }
]

const dummyFamilyMembers = ['John', 'Jane', 'Michael']
const { Option } = Select

const Dashboard = () => {
  console.log('DASHBOARd')
  const [calendarData, setCalendarData] = useState([])
  const db = getFirebaseDb()

  useEffect(() => {
    const fetchCalendarData = async () => {
      const calendarCollection = db.collection('calendar')
      const snapshot = await calendarCollection.get()
      const data = snapshot.docs.map((doc) => doc.data())
      setCalendarData(data)
    }

    fetchCalendarData()
  }, [db])

  const dropdown = (
    <Select placeholder='Select a month'>
      <Option disabled>
        To add a new month, go to the calendar page
      </Option>
      {calendarData.map((month) => (
        <Option key={month.id} value={month.id}>
          {month.name}
        </Option>
      ))}
    </Select>
  )

  return (
    <MenuWrap route='/' title='Dashboard' statistic={12312 / 12312} dropdown={dropdown}>
      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.title}>Monthly Expenditures</div>
          <MonthlyExpenditureList />
        </div>
        <div className={styles.column}>
          <ExpenditureBreakdown expenditures={dummyExpenditures} familyMembers={dummyFamilyMembers} />
        </div>
      </div>
    </MenuWrap>

  )
}

export default Dashboard
