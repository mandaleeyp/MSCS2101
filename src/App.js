import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './Dashboard/Dashboard'
import FamilyProfile from './FamilyProfile/FamilyProfile'
import Resources from './Resources/Resources'
import Calendar from './Calendar/Calendar'
import Account from './Account/Account'
import Settings from './Settings/Settings'
import SuccessPage from './Account/SuccessPage'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/family-profile' element={<FamilyProfile />} />
        <Route path='/resources' element={<Resources />} />
        <Route path='/account' element={<Account />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/success' element={<SuccessPage />} />
      </Routes>
    </Router>
  )
}

export default App
