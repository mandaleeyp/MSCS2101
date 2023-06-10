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
    const { month, year, availableFunds, savingsGoal } = values
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
        year: (year.$y).toString(),
        familyId,
        availableFunds,
        savingsGoal
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
        <div className={styles.title}>Add New Month</div>
        <div className={styles.description}>To track your progress and set monthly goals, you can add a "New Month" card where you can define your desired goal and monitor your progress throughout the month. This feature empowers you to stay focused and achieve your objectives effectively.
        </div>
        <Button className={styles.addButton} type='primary' onClick={showModal}>
          Add New Month
        </Button>
      </div>

      <Modal
        className={styles.modal}
        title='Add Month'
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleAddMonth}>
          <Form.Item
            name='month'
            label='Month'
            labelCol={{ span: 6 }} // Adjust the span value to control the label width
            wrapperCol={{ span: 18 }} // Adjust the span value to control the input width
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
            labelCol={{ span: 6 }} // Adjust the span value to control the label width
            wrapperCol={{ span: 18 }} // Adjust the span value to control the input width
            rules={[{ required: true, message: 'Please select the year' }]}
          >
            <DatePicker picker='year' placeholder='Select year' />
          </Form.Item>
          <Form.Item
            name='availableFunds'
            label='Available Funds'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            rules={[
              { required: true, message: 'Please enter the total amount of funds available this month' }
            ]}
          >
            <Input type='number' step='0.01' />
          </Form.Item>
          <Form.Item
            name='savingsGoal'
            label='Savings Goal'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            rules={[
              { required: true, message: 'Please enter the desired amount to save' }
              // ({ getFieldValue }) => ({
              //   validator (_, value) {
              //     const availableFunds = getFieldValue('availableFunds')
              //     if (value >= availableFunds) {
              //       return Promise.resolve();
              //     } else {
              //       return Promise.reject('The desired amount to save cannot be more than the available funds');
              //     }
              //   }
              // })
            ]}
          >
            <Input type='number' step='0.01' />
          </Form.Item>
          <Form.Item
            className={styles.footer}
          >
            <Button className={styles.submit} type='primary' htmlType='submit'>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddMonth
