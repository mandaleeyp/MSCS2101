import React, { useContext } from 'react'
import { Menu, Tag } from 'antd'

import styles from './Resources.module.css'
import MenuWrap from '../Menu/MenuWrap'

const Resources = () => {

  return (
    <MenuWrap route='/resources'>
        <div>
        This is the Resources page
        </div>
    </MenuWrap>
        
  )
}

export default Resources
