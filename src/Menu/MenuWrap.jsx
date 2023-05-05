import React, { useContext, useState } from 'react'
import { Layout, Menu, Tag } from 'antd'
import { HomeOutlined, InfoCircleOutlined, ProfileOutlined, SettingOutlined, CalendarOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import styles from './MenuWrap.module.css'
import Sider from 'antd/es/layout/Sider'
import familyPhoto from '../images/family-icon.svg'
import Header from '../Header/Header'

const MenuWrap = ({ children, route }) => {
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState([route])

  const routes = [
    {
      icon: <HomeOutlined />,
      title: 'Dashboard',
      route: '/'
    },
    {
      icon: <CalendarOutlined />,
      title: 'Calendar',
      route: '/calendar'
    },
    {
      icon: <ProfileOutlined />,
      title: 'Family Profile',
      route: '/family-profile'
    },
    {
      icon: <InfoCircleOutlined />,
      title: 'Resources',
      route: '/resources'
    },
    {
      icon: <SettingOutlined />,
      title: 'Settings',
      route: '/settings'
    }
  ]

  return (
    
    <Layout style={{ minHeight: '100vh' }}>
    <Sider
      className={styles.sider}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className={styles.logo}>Budget Buddy</div>
      <div className={styles.familyPhoto}><img src={familyPhoto}></img></div>
      <div className={styles.familyName}>The Wilson Family</div>
      <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} className={styles.menu}>
        {routes.map((route) => {
          return (
            <Menu.Item key={route.route} icon={route.icon} onClick={(e) => {
              setSelectedKeys([e.key])
              navigate(e.key)
            }}>
              {route.title}
            </Menu.Item>
          )
     
        })}
      </Menu>
    </Sider>
    <Layout>
      <Header title='Dashboard' description='' />
        <div className={styles.container}>
          {children}
        </div>
    </Layout>
  </Layout>
  )
}

export default MenuWrap
