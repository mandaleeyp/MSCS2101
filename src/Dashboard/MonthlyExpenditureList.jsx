import React, { useState } from 'react'
import { Card, Button, Modal, Form, Input, DatePicker, Select, Avatar } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'

const { Option } = Select

const MonthlyExpenditureList = () => {
  const [expenses, setExpenses] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = (values) => {
    const newExpense = {
      id: expenses.length + 1,
      category: values.category,
      description: values.description,
      date: values.date.format('YYYY-MM-DD'),
      spender: values.spender,
      amount: values.amount
    }

    setExpenses([...expenses, newExpense])
    handleOk()
  }

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id)
    setExpenses(updatedExpenses)
  }

  return (
    <div>
      <Button type='primary' icon={<PlusOutlined />} onClick={showModal}>
        Add Expense
      </Button>

      {expenses.map((expense) => (
        <Card
          key={expense.id}
          style={{ marginTop: '20px', border: '3px solid var(--background)' }}
          actions={[
            <DeleteOutlined key='delete' onClick={() => handleDelete(expense.id)} />
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{expense.spender.charAt(0)}</Avatar>}
            title={expense.category}
            description={expense.description}
          />
          <div>Date: {expense.date}</div>
          <div>Spender: {expense.spender}</div>
          <div>Amount: ${expense.amount}</div>
        </Card>
      ))}

      <Modal title='Add Expense' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form onFinish={onFinish}>
          <Form.Item name='category' label='Category' rules={[{ required: true, message: 'Please enter the category' }]}>
            <Select>
              <Option value='Food'>Food</Option>
              <Option value='Transportation'>Transportation</Option>
              <Option value='Entertainment'>Entertainment</Option>
              <Option value='Shopping'>Shopping</Option>
            </Select>
          </Form.Item>
          <Form.Item name='description' label='Description' rules={[{ required: true, message: 'Please enter the description' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='date' label='Date' rules={[{ required: true, message: 'Please select the date' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name='spender' label='Spender' rules={[{ required: true, message: 'Please enter the spender' }]}>
            <Input />
          </Form.Item>
          <Form.Item name='amount' label='Amount' rules={[{ required: true, message: 'Please enter the amount' }]}>
            <Input type='number' />
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

export default MonthlyExpenditureList
