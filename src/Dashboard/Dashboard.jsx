import React, { useState, useEffect } from 'react'

import styles from './Dashboard.module.css'
import MenuWrap from '../Menu/MenuWrap'
import MonthlyExpenditureList from './MonthlyExpenditureList'
import ExpenditureBreakdown from './ExpenditureBreakdown'
import { Select } from 'antd'
import { getFirebaseDb } from '../Utils/getDatabase'
import { collection, query, where, onSnapshot, getDocs } from 'firebase/firestore'
import { useAuth } from '../Login/AuthContext'

const { Option } = Select

const Dashboard = () => {
  const db = getFirebaseDb()
  const { currentUser } = useAuth()
  const familyId = currentUser.uid
  const [calendarData, setCalendarData] = useState([])
  const [currentMonthYear, setCurrentMonthYear] = useState(null)
  const [expenses, setExpenses] = useState([])

  // calendar data
  useEffect(() => {
    const fetchCalendarData = async () => {
      const q = query(collection(db, 'calendar'), where('familyId', '==', familyId))
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc) => doc.data())
      setCalendarData(data)
      setCurrentMonthYear(data.length > 0 ? `${data[0].month}-${data[0].year}` : null)
    }

    fetchCalendarData()
  }, [db])

  useEffect(() => {
    const q = query(collection(db, 'calendar'), where('familyId', '==', familyId))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedData = snapshot?.docs?.map((doc) => doc?.data())
      setCalendarData(updatedData)
    })
    return () => unsubscribe()
  }, [db, familyId])

  const handleChangeMonth = (e) => {
    setCurrentMonthYear(e)
  }

  // expenses data
  useEffect(() => {
    const fetchExpensesData = async () => {
      const q = query(
        collection(db, 'expenses'),
        where('familyId', '==', familyId),
        where('month', '==', currentMonthYear?.split('-')[0]),
        where('year', '==', currentMonthYear?.split('-')[1])
      )
      const querySnapshot = await getDocs(q)
      const data = querySnapshot?.docs.map((doc) => doc?.data())
      setExpenses(data)
    }
    if (currentMonthYear) fetchExpensesData()
  }, [db, currentMonthYear])

  useEffect(() => {
    if (currentMonthYear) {
      const q = query(
        collection(db, 'expenses'),
        where('familyId', '==', familyId),
        where('month', '==', currentMonthYear?.split('-')[0]),
        where('year', '==', currentMonthYear?.split('-')[1])
      )
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const updatedData = snapshot?.docs?.map((doc) => doc?.data())
        setExpenses(updatedData)
      })
      return () => unsubscribe()
    }
  }, [db, familyId, currentMonthYear])

  return (
    <MenuWrap route='/' title='Dashboard'>
      <div className={styles.container}>
        <Select placeholder='Select a month' value={currentMonthYear} onChange={(e) => handleChangeMonth(e)}>
          <Option disabled>
            To add a new month, go to the calendar page
          </Option>
          {calendarData.map((data) => (
            <Option key={`${data.month}-${data.year}`} value={`${data.month}-${data.year}`}>
              {data.month} {data.year}
            </Option>
          ))}
        </Select>
        <div className={styles.statsContainer}>
          <div className={styles.column}>
            <div className={styles.title}>Monthly Expenditures</div>
            <MonthlyExpenditureList expenses={expenses} currentMonthYear={currentMonthYear} />
          </div>
          <div className={styles.column}>
            <ExpenditureBreakdown expenditures={expenses} />
          </div>
        </div>
      </div>
    </MenuWrap>

  )
}

export default Dashboard
