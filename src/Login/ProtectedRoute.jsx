import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser === null) {
      navigate('/login')
    }
  }, [currentUser, navigate])

  return currentUser && children
}

export default ProtectedRoute
