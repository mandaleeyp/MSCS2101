import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();
//   console.log('currentUser', currentUser);

//   useEffect(() => {
//     if (!currentUser) {
//       navigate('/login');
//     }
//   }, [currentUser]);

//   return (
//       <Route {...rest}
//         render={(props) => {
//           return (
//           <Component {...props} />
//           )
//         }}
//       />
//     )
// };

// export default ProtectedRoute;

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
