import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './Dashboard/Dashboard'
import FamilyProfile from './FamilyProfile/FamilyProfile'
import Resources from './Resources/Resources'
import Calendar from './Calendar/Calendar'
// import Account from './Account/Account'
import Settings from './Settings/Settings'
// import SuccessPage from './Account/SuccessPage'
import ProtectedRoute from './Login/ProtectedRoute'
import Login from './Login/Login'
import { AuthProvider } from './Login/AuthContext'

function App () {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/calendar'
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          />
          <Route
            path='/family-profile'
            element={
              <ProtectedRoute>
                <FamilyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/resources'
            element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            }
          />
          <Route
            path='/settings'
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          {/* <Route path='/account' element={<Account />} />
          <Route path='/success' element={<SuccessPage />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
