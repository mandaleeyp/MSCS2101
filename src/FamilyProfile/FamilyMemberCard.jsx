// family card component
import React from 'react'
import styles from './FamilyMemberCard.module.css'
import { Avatar, Card } from 'antd'

import avatar1 from '../images/avatar-1.png'
import avatar2 from '../images/avatar-2.png'
import avatar3 from '../images/avatar-3.png'

const avatarOptions = {
  avatar1,
  avatar2,
  avatar3
}

const FamilyMemberCard = ({ data }) => {
  return data && <Card>
    <Card.Meta
      avatar={<Avatar src={avatarOptions[data.avatar]} />}
      title={data.name}
      description={data.relationship}
    />
                 </Card>
}

export default FamilyMemberCard
