import React, { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'

import styles from './Calendar.module.css'
import MenuWrap from '../Menu/MenuWrap'
import AddMonth from './AddMonth'
import MonthCard from './MonthCard'
import { getFirebaseDb } from '../Utils/getDatabase'
import { useAuth } from '../Login/AuthContext'

const Calendar = () => {
  const [months, setMonths] = useState([])
  const db = getFirebaseDb()
  const { currentUser } = useAuth()
  const familyId = currentUser.uid

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        const q = query(collection(db, 'calendar'), where('familyId', '==', familyId))
        const querySnapshot = await getDocs(q)
        const calendarData = querySnapshot.docs.map((doc) => doc.data())
        setMonths(calendarData)
      } catch (error) {
        console.error('Error fetching calendar:', error)
      }
    }
    fetchMonths()
  }, [])

  return (
    <MenuWrap route='/calendar' title='Calendar'>
      <div className={styles.grid}>
        <AddMonth />
        {months?.map((month, i) => (
          <MonthCard key={i} data={month} />
        ))}
      </div>
    </MenuWrap>

  )
}

export default Calendar
