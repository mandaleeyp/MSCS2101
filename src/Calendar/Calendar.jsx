import React, { useContext } from 'react'
import { Menu, Tag } from 'antd'

import styles from './Calendar.module.css'
import MenuWrap from '../Menu/MenuWrap'

const Calendar = () => {

  return (
    <MenuWrap route='/calendar'>
        <div>
        This is the Calendar page
        </div>
    </MenuWrap>
        
  )
}

export default Calendar
