import React, { useContext } from 'react'
import { Menu, Tag } from 'antd'

import styles from './Dashboard.module.css'
import MenuWrap from '../Menu/MenuWrap'

const Dashboard = () => {

  return (
    <MenuWrap route='/'>
        <div>
        This is the dashboard page
        </div>
    </MenuWrap>
        
  )
}

export default Dashboard
