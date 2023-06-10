import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  console.log('currentUser', currentUser)

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser])

  return children
}

export default ProtectedRoute
