import React, { useState, useEffect } from 'react'
import { collection, query, where, onSnapshot } from 'firebase/firestore'

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
    const q = query(collection(db, 'calendar'), where('familyId', '==', familyId))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedData = snapshot?.docs?.map((doc) => doc?.data())
      setMonths(updatedData)
    })
    return () => unsubscribe()
  }, [db, familyId])

  return (
    <MenuWrap route='/calendar' title='Calendar'>
      <AddMonth />
      <div className={styles.grid}>
        {months?.map((month, i) => (
          <MonthCard key={i} data={month} />
        ))}
      </div>
    </MenuWrap>

  )
}

export default Calendar
