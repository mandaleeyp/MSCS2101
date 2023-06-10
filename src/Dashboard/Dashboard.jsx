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
  const [totalSpent, setTotalSpent] = useState(0)
  const [currentMonthData, setCurrentMonthData] = useState(null)

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
  }, [db, familyId])

  useEffect(() => {
    const q = query(collection(db, 'calendar'), where('familyId', '==', familyId))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedData = snapshot?.docs?.map((doc) => doc?.data())
      setCalendarData(updatedData)
    })
    return () => unsubscribe()
  }, [db, familyId])

  const calculateTotalExpenses = (expenses) => {
    let total = 0
    expenses.forEach((expense) => {
      const amount = parseFloat(expense.amount)
      total += amount
    })

    return total.toFixed(2)
  }

  useEffect(() => {
    if (expenses) {
      setTotalSpent(calculateTotalExpenses(expenses))
    }
  }, [db, familyId, expenses])

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
  }, [db, currentMonthYear, familyId])

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

  // current Month data
  useEffect(() => {
    const fetchCurrentMonthData = async () => {
      const q = query(
        collection(db, 'calendar'),
        where('familyId', '==', familyId),
        where('month', '==', currentMonthYear?.split('-')[0]),
        where('year', '==', currentMonthYear?.split('-')[1])
      )
      const querySnapshot = await getDocs(q)
      const data = querySnapshot?.docs.map((doc) => doc?.data())
      setCurrentMonthData(data)
    }
    if (currentMonthYear) fetchCurrentMonthData()
  }, [db, currentMonthYear, familyId])

  return (
    <MenuWrap route='/' title='Dashboard'>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.customCard}>
            <div className={styles.cardTitle}>Date</div>
            <Select className={styles.select} placeholder='Select a month' value={currentMonthYear} onChange={(e) => handleChangeMonth(e)}>
              <Option disabled>
                To add a new month, go to the calendar page
              </Option>
              {calendarData.map((data) => (
                <Option key={`${data.month}-${data.year}`} value={`${data.month}-${data.year}`}>
                  {data.month} {data.year}
                </Option>
              ))}
            </Select>
          </div>
          <div className={styles.customCard}>
            <div className={styles.cardTitle}>Savings Goal</div>
            <div className={styles.cardValue}>${currentMonthData ? currentMonthData[0]?.savingsGoal : 0}</div>
          </div>
          <div className={styles.customCard}>
            <div className={styles.cardTitle}>Spent / Budget</div>
            <div className={styles.cardValue}>${totalSpent} / ${currentMonthData ? currentMonthData[0]?.availableFunds : 0}</div>
          </div>
        </div>
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
