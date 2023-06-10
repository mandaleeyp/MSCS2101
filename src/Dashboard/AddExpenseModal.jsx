import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Input, DatePicker, Select, message, Avatar, Tag } from 'antd'
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore'
import { useAuth } from '../Login/AuthContext'
import { getFirebaseDb } from '../Utils/getDatabase'
import styles from './AddExpenseModal.module.css'
import { AVATAR_OPTIONS, EXPENSE_CATEGORIES } from '../constants'
import dayjs from 'dayjs'

const { Option } = Select
const monthMapping = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11
}
const AddExpenseModal = ({ currentMonthYear, isModalVisible, setIsModalVisible }) => {
  const db = getFirebaseDb()
  const { currentUser } = useAuth()
  const familyId = currentUser.uid
  const [familyMembers, setFamilyMembers] = useState([])
  const month = currentMonthYear?.split('-')[0]
  const year = currentMonthYear?.split('-')[1]
  const [form] = Form.useForm()
  const dateFormat = 'YYYY/MM/DD'

  useEffect(() => {
    const fetchFamilyMembersData = async () => {
      const q = query(collection(db, 'familyMembers'), where('familyId', '==', familyId))
      const querySnapshot = await getDocs(q)
      const data = querySnapshot?.docs.map((doc) => doc?.data())
      setFamilyMembers(data)
    }

    fetchFamilyMembersData()
  }, [db, familyId])

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = async (values) => {
    const expenses = doc(collection(db, 'expenses'))
    await setDoc(expenses, {
      familyId,
      month,
      year,
      category: values.category,
      description: values.description,
      date: values.date.format('YYYY-MM-DD'),
      spender: values.spender.split('-')[0],
      avatar: values.spender.split('-')[1],
      amount: values.amount
    })
    message.success('New expense added successfully!')
    // Reset the form values
    form.resetFields() // Reset the form values
    handleOk()
  }

  // Define the specific month and year
  const targetMonth = monthMapping[month] // June (0-based index)
  const targetYear = year

  const disabledDate = (current) => {
    const currentMonth = current.month()
    const currentYear = current.year()
    // Disable all months and years except the target month and year
    return !(currentMonth === targetMonth && currentYear === parseInt(targetYear))
  }

  const defaultDate = dayjs(`${targetYear}/${String(targetMonth + 1).padStart(2, '0')}/01`, dateFormat)

  return (
    <Modal
      className={styles.modal}
      title='Add Expense' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}
    >
      <Form
        onFinish={onFinish} form={form}
        initialValues={{
          date: defaultDate
        }}
      >
        <Form.Item
          name='category' label='Category'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          rules={[{ required: true, message: 'Please enter the category' }]}
        >
          <Select size='large'>
            {Object.keys(EXPENSE_CATEGORIES).map((category, i) => (
              <Option key={i} value={category}><Tag className={styles.categoryTag} color={EXPENSE_CATEGORIES[category].color}>{category}</Tag></Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          name='description' label='Description' rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          name='date' label='Date' rules={[{ required: true, message: 'Please select the date' }]}
        >
          <DatePicker disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          name='spender' label='Spender' rules={[{ required: true, message: 'Please enter the spender' }]}
        >
          <Select size='large' placeholder='Select spender'>
            {familyMembers.map((member, i) => (
              <Option key={i} value={`${member.name}-${member.avatar}`}>
                <Avatar
                  key={i}
                  icon={<img src={AVATAR_OPTIONS[member.avatar]} alt='icon' />}
                  alt='Avatar'
                  style={{
                    marginRight: '12px'
                  }}
                  size={28}
                  shape='circle'
                />{member.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          name='amount' label='Amount' rules={[{ required: true, message: 'Please enter the amount' }]}
        >
          <Input type='number' />
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
  )
}

export default AddExpenseModal
