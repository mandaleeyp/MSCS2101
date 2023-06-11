import React from 'react'

import styles from './Resources.module.css'
import MenuWrap from '../Menu/MenuWrap'
import { Avatar, Tag } from 'antd'
import {
  QuestionOutlined
} from '@ant-design/icons'

const Resources = () => {
  const resources = [
    {
      title: 'How to Budget',
      url: 'https://www.nerdwallet.com/article/finance/how-to-budget',
      time: '5 minute read'
    },
    {
      title: 'Budgeting for Kids',
      url: 'https://www.thebalancemoney.com/teach-kids-to-budget-money-454012',
      time: '3 minute read'
    },
    {
      title: 'How to create a Family Budget',
      url: 'https://www.nerdwallet.com/article/finance/how-to-create-a-family-budget',
      time: '7 minute read'
    },
    {
      title: 'Why Teaching Children Financial Literacy is Important',
      url: 'https://www.cnbc.com/2021/04/05/giving-kids-an-early-financial-education-pays-off-in-the-future.html',
      time: '4 minute read'
    },
    {
      title: 'Top Tips for Children Learning to Budget',
      url: 'https://www.adobe.com/acrobat/hub/how-to/budgeting-tips-for-kids.html',
      time: '2 minute read'
    },
    {
      title: 'What are Wants vs Needs in a Budget',
      url: 'https://www.nerdwallet.com/article/finance/financial-needs-versus-wants',
      time: '3 minute read'
    }
  ]
  return (
    <MenuWrap route='/resources' title='Resources'>
      <div className={styles.aboutCard}>
        <div className={styles.title}>About Resources</div>
        <div className={styles.description}>This page provides a curated collection of resources on budgeting to help empower
          families on their financial journey. These resources offer expert advice and insightful tips to help your family
          gain financial literacy and make informed decisions for a secure and prosperous future.
        </div>
      </div>
      <div className={styles.grid}>
        {resources?.map((resource, i) => (
          <div className={styles.card} key={i} onClick={() => window.open(resource.url, '_blank', 'noopener,noreferrer')}>
            <Avatar className={styles.avatar} icon={<QuestionOutlined className={styles.icon} />} />
            <div className={styles.resourceTitle}>{resource.title}</div>
            <Tag color='orange' className={styles.tag}>{resource.time}</Tag>
          </div>
        ))}
      </div>
    </MenuWrap>
  )
}

export default Resources
