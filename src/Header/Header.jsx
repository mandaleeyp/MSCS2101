import React, { useState, useEffect } from 'react'

import styles from './Header.module.css'
import { Select } from 'antd'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { useAuth } from '../Login/AuthContext'
import { getFirebaseDb } from '../Utils/getDatabase'

const { Option } = Select

const Header = ({ title, statistic, dropdown }) => {
  const [calendarData, setCalendarData] = useState([])
  const [defaultMonth, setDefaultMonth] = useState(null)

  const db = getFirebaseDb()
  const { currentUser } = useAuth()
  const familyId = currentUser.uid

  useEffect(() => {
    const fetchCalendarData = async () => {
      const q = query(collection(db, 'calendar'), where('familyId', '==', familyId))
      const querySnapshot = await getDocs(q)
      const data = querySnapshot.docs.map((doc) => doc.data())
      setCalendarData(data)
      setDefaultMonth(data.length > 0 ? `${data[0].month}-${data[0].year}` : null)
    }

    fetchCalendarData()
  }, [db])

  // useEffect(() => {
  //   const q = query(collection(db, 'calendar'), where('familyId', '==', familyId))
  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const updatedData = snapshot?.docs?.map((doc) => doc?.data())
  //     setCalendarData(updatedData)
  //     setDefaultMonth(updatedData.length > 0 ? `${updatedData[0].year}-${updatedData[0].month}` : null)
  //     console.log('updatedData', updatedData)
  //   })
  //   return () => unsubscribe()
  // }, [db, familyId])

  return (
    <div className={styles.header}>
      <div className={styles.column}>
        <div className={styles.welcome}>Welcome!</div>
        <div className={styles.title}>{title}</div>
        {statistic && <div className={styles.statistic}><span className={styles.dollar}>$</span>2133 / 2313 <span className={styles.subtext}>spent so far</span></div>}
      </div>
      <div className={styles.dropdown}>
        {dropdown &&
          <Select placeholder='Select a month' defaultValue={defaultMonth}>
            <Option disabled>
              To add a new month, go to the calendar page
            </Option>
            {calendarData.map((data) => (
            // console.log(`${data.year}-${data.month}`)
              <Option key={`${data.month}-${data.year}`} value={`${data.month}-${data.yaer}`}>
                {data.month} {data.year}
              </Option>
            ))}
          </Select>}
      </div>
    </div>
  )
}

export default Header
