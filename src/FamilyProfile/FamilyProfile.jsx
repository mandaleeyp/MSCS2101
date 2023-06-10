import React, { useState, useEffect } from 'react'

import styles from './FamilyProfile.module.css'
import MenuWrap from '../Menu/MenuWrap'
import AddFamilyMemberCard from './AddFamilyMemberCard'
import { getFirebaseDb } from '../Utils/getDatabase'
import FamilyMemberCard from './FamilyMemberCard'
import { getDatabase, query, ref } from 'firebase/database'
import { collection, getDocs } from 'firebase/firestore'
import { useAuth } from '../Login/AuthContext'

const FamilyProfile = () => {
  const [familyMembers, setFamilyMembers] = useState([])
  const db = getFirebaseDb()
  const { currentUser } = useAuth()
  console.log(currentUser)
  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'familyMembers'))
        const familyMembersData = querySnapshot.docs.map((doc) => doc.data())
        setFamilyMembers(familyMembersData)
      } catch (error) {
        console.error('Error fetching family members:', error)
      }
    }

    fetchFamilyMembers()
  }, [])

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
