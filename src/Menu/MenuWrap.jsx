import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { HomeOutlined, InfoCircleOutlined, ProfileOutlined, LogoutOutlined, AccountBookOutlined, CalendarOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import styles from './MenuWrap.module.css'
import Sider from 'antd/es/layout/Sider'
import familyPhoto from '../images/family-icon.svg'
import Header from '../Header/Header'
import { getAuth } from 'firebase/auth'
import { app } from '../index'

const MenuWrap = ({ children, route, title, statistic = null, dropdown = null }) => {
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
    }
    // {
    //   icon: <AccountBookOutlined />,
    //   title: 'Account',
    //   route: '/account'
    // },
    // {
    //   icon: <SettingOutlined />,
    //   title: 'Settings',
    //   route: '/settings'
    // }
  ]

  const handleLogout = async () => {
    try {
      const auth = getAuth(app)
      await auth.signOut()
      // Perform any additional logout logic or redirect as needed
    } catch (error) {
      // Handle error
      console.log('Error occurred during logout:', error)
    }
  }

  return (

    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        className={styles.sider}
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
      >
        <div className={styles.logo}>Budget Buddy</div>
        <div className={styles.familyPhoto}><img src={familyPhoto} alt='family' /></div>
        <div className={styles.familyName}>The Wilson Family</div>
        <Menu theme='dark' mode='inline' selectedKeys={selectedKeys} className={styles.menu}>
          {routes.map((route) => {
            return (
              <Menu.Item
                key={route.route} icon={route.icon} onClick={(e) => {
                  setSelectedKeys([e.key])
                  navigate(e.key)
                }}
              >
                {route.title}
              </Menu.Item>
            )
          })}
          <Menu.Item style={{ bottom: '24px', position: 'absolute' }} className={styles.logout} icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header title={title} description='' statistic={statistic} dropdown={dropdown} />
        <div className={styles.container}>
          {children}
        </div>
      </Layout>
    </Layout>
  )
}

export default MenuWrap
