// family card component
import React from 'react'
import styles from './FamilyMemberCard.module.css'
import { Avatar, Card, Tag } from 'antd'

import { AVATAR_OPTIONS } from '../constants'

const FamilyMemberCard = ({ data }) => {
  return (data &&
    <Card className={styles.card}>
      <Card.Meta
        avatar={<Avatar className={styles.avatar} src={AVATAR_OPTIONS[data.avatar]} />}
        title={data.name}
        description={<Tag color='gold' className={styles.tag}>{data.relationship}</Tag>}
      />
    </Card>)
}

export default FamilyMemberCard
