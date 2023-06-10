import React, { useState, useEffect } from 'react'

import styles from './FamilyProfile.module.css'
import MenuWrap from '../Menu/MenuWrap'
import AddFamilyMemberCard from './AddFamilyMemberCard'
import { getFirebaseDb } from '../Utils/getDatabase'
import FamilyMemberCard from './FamilyMemberCard'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { useAuth } from '../Login/AuthContext'

const FamilyProfile = () => {
  const [familyMembers, setFamilyMembers] = useState([])
  const db = getFirebaseDb()
  const { currentUser } = useAuth()
  const familyId = currentUser.uid
  useEffect(() => {
    const q = query(collection(db, 'familyMembers'), where('familyId', '==', familyId))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedData = snapshot?.docs?.map((doc) => doc?.data())
      setFamilyMembers(updatedData)
    })
    return () => unsubscribe()
  }, [db, familyId])

  return (
    <MenuWrap route='/family-profile' title='Family Profile'>
      <div className={styles.grid}>
        <AddFamilyMemberCard />
        {familyMembers?.map((familyMember, i) => (
          <FamilyMemberCard key={i} data={familyMember} />
        ))}
      </div>
    </MenuWrap>

  )
}

export default FamilyProfile
