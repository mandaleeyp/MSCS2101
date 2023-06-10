import React, { useState } from 'react'
import { Button, Modal, Form, Input, message, DatePicker, Select } from 'antd'

import styles from './Calendar.module.css'
import { getFirebaseDb } from '../Utils/getDatabase'
import { useAuth } from '../Login/AuthContext'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
const { Option } = Select

const AddMonth = () => {
  const db = getFirebaseDb()
  const { currentUser } = useAuth()
  const familyId = currentUser.uid

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleAddMonth = async (values) => {
    const { month, year, goal } = values
    const q = query(
      collection(db, 'calendar'),
      where('familyId', '==', familyId),
      where('month', '==', month),
      where('year', '==', year.$y)
    )
    const existingMonth = await getDocs(q)
    if (existingMonth.empty) {
      const newMonth = doc(collection(db, 'calendar'))
      await setDoc(newMonth, {
        month,
        year: year.$y,
        familyId,
        goal
      })
      // Show success message
      message.success('Month added successfully!')
    } else {
      // Show error message if month/year already exists
      message.error('Month/year already exists!')
    }

    // Reset form fields and hide the modal
    handleCancel()
  }

  return (
    <div>
      <div className={styles.card}>
        <Button className={styles.addButton} type='primary' onClick={showModal}>
          Add Month
        </Button>
      </div>

      <Modal
        title='Add Month'
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleAddMonth}>
          <Form.Item
            name='month'
            label='Month'
            rules={[{ required: true, message: 'Please select the month' }]}
          >
            <Select placeholder='Select month'>
              <Option value='January'>January</Option>
              <Option value='February'>February</Option>
              <Option value='March'>March</Option>
              <Option value='April'>April</Option>
              <Option value='May'>May</Option>
              <Option value='June'>June</Option>
              <Option value='July'>July</Option>
              <Option value='August'>August</Option>
              <Option value='September'>September</Option>
              <Option value='October'>October</Option>
              <Option value='November'>November</Option>
              <Option value='December'>December</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name='year'
            label='Year'
            rules={[{ required: true, message: 'Please select the year' }]}
          >
            <DatePicker picker='year' placeholder='Select year' />
          </Form.Item>

          <Form.Item
            name='goal'
            label='Goal Amount'
            rules={[
              { required: true, message: 'Please enter the goal amount' }
              //   { type: 'number', message: 'Please enter a valid number' },
            ]}
          >
            <Input type='number' step='0.01' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddMonth
