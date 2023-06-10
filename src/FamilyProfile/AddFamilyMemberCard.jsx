// family card component
import React, { useState } from 'react'
import styles from './AddFamilyMemberCard.module.css'
import { Form, Button, Modal, Input, message, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import avatar1 from '../images/avatar-1.png'
import avatar2 from '../images/avatar-2.png'
import avatar3 from '../images/avatar-3.png'
import { getFirebaseDb } from '../Utils/getDatabase'
import { collection, doc, setDoc } from 'firebase/firestore'

const avatarOptions = {
  avatar1,
  avatar2,
  avatar3
}

const AddFamilyMemberCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [selectedAvatar, setSelectedAvatar] = useState('')

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    form.resetFields()
    setSelectedAvatar('')
  }

  const handleSubmit = async (values) => {
    try {
      const db = getFirebaseDb()
      const newFamilyMemberRef = doc(collection(db, 'familyMembers'))
      await setDoc(newFamilyMemberRef, {
        name: values.name,
        relationship: values.relationship,
        avatar: selectedAvatar
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
        <h3>Add Family Member</h3>
        <Button className={styles.addButton} type='primary' onClick={openModal}>
          Add New Member
        </Button>
      </div>

      <Modal
        title='Add Family Member'
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='relationship'
            label='Relationship'
            rules={[{ required: true, message: 'Please enter the relationship' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='avatar'
            label='Avatar'
            rules={[{ required: true, message: 'Please select an avatar' }]}
          >
            {Object.keys(avatarOptions).map((avatar) => (
              <Avatar
                key={avatar}
                icon={<img src={avatarOptions[avatar]} alt='icon' />}
                alt='Avatar'
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'var(--secondary)',
                  padding: '12px',
                  marginRight: '12px',
                  border: selectedAvatar === avatar ? '5px solid var(--accent)' : 'none'
                }}
                onClick={() => handleAvatarChange(avatar)}
                size={64}
                shape='circle'
              />
            ))}
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddFamilyMemberCard
