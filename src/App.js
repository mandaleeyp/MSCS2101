import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Dashboard from './Dashboard/Dashboard'
import FamilyProfile from './FamilyProfile/FamilyProfile'
import Resources from './Resources/Resources'
import Calendar from './Calendar/Calendar'
import Settings from './Settings/Settings'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/family-profile' element={<FamilyProfile />} />
        <Route path='/resources' element={<Resources />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App
