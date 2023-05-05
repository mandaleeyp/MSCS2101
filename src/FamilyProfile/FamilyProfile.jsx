import React, { useContext } from 'react'
import { Menu, Tag } from 'antd'

import styles from './FamilyProfile.module.css'
import MenuWrap from '../Menu/MenuWrap'

const FamilyProfile = () => {

  return (
    <MenuWrap route='/family-profile'>
        <div>
        This is the FamilyProfile page
        </div>
    </MenuWrap>
        
  )
}

export default FamilyProfile
