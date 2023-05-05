import React, { useContext } from 'react'
import { Menu, Tag } from 'antd'

import styles from './Settings.module.css'
import MenuWrap from '../Menu/MenuWrap'

const Settings = () => {

  return (
    <MenuWrap route='/settings'>
        <div>
        This is the Settings page
        </div>
    </MenuWrap>
        
  )
}

export default Settings
