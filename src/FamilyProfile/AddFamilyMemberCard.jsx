import React, { useState } from 'react'
import styles from './AddFamilyMemberCard.module.css'
import { Form, Button, Modal, Input, message, Avatar } from 'antd'
import { getFirebaseDb } from '../Utils/getDatabase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { AVATAR_OPTIONS } from '../constants'
import { useAuth } from '../Login/AuthContext'

const AddFamilyMemberCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [selectedAvatar, setSelectedAvatar] = useState('')
  const { currentUser } = useAuth()

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    form.resetFields()
    setSelectedAvatar('')
  }
  console.log(currentUser)
  const handleSubmit = async (values) => {
    try {
      const db = getFirebaseDb()
      const newFamilyMemberRef = doc(collection(db, 'familyMembers'))
      await setDoc(newFamilyMemberRef, {
        name: values.name,
        relationship: values.relationship,
        avatar: selectedAvatar,
        familyId: currentUser.uid
      })
      form.resetFields()
      closeModal()
      message.success('New family member added successfully!')
    } catch (error) {
      message.error('Failed to add family member. Please try again.')
    }
  }

  const handleAvatarChange = (avatar) => {
    form.setFieldValue('avatar', avatar)
    setSelectedAvatar(avatar)
  }

  return (
    <div>
      <div className={styles.card}>
        <div className={styles.title}>Add Family Member</div>
        <div className={styles.description}>To get started on your family profile in the BudgetBuddy app,
          begin by creating family members. This will allow you to track individual expenses
          and manage your overall budget effectively.
        </div>
        <Button className={styles.addButton} type='primary' onClick={openModal}>
          Add New Member
        </Button>
      </div>

      <Modal
        className={styles.modal}
        title='Add Family Member'
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name='name'
            label='Name'
            labelCol={{ span: 6 }} // Adjust the span value to control the label width
            wrapperCol={{ span: 18 }} // Adjust the span value to control the input width
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='relationship'
            label='Relationship'
            labelCol={{ span: 6 }} // Adjust the span value to control the label width
            wrapperCol={{ span: 18 }} // Adjust the span value to control the input width
            rules={[{ required: true, message: 'Please enter the relationship' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='avatar'
            label='Avatar'
            labelCol={{ span: 6 }} // Adjust the span value to control the label width
            wrapperCol={{ span: 18 }} // Adjust the span value to control the input width
            rules={[{ required: true, message: 'Please select an avatar' }]}
          >
            {Object.keys(AVATAR_OPTIONS).map((avatar) => (
              <Avatar
                key={avatar}
                icon={<img src={AVATAR_OPTIONS[avatar]} alt='icon' />}
                alt='Avatar'
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'var(--secondary)',
                  padding: '12px',
                  marginRight: '12px',
                  marginBottom: 6,
                  border: selectedAvatar === avatar ? '5px solid var(--accent)' : 'none'
                }}
                onClick={() => handleAvatarChange(avatar)}
                size={64}
                shape='circle'
              />
            ))}
          </Form.Item>
          <Form.Item
            className={styles.footer}
          >
            <Button className={styles.submit} type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddFamilyMemberCard
