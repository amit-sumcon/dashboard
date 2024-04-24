import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Edit from './components/Edit';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import Layout from './shared/Layout';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  return (
    <div className={`${isDarkMode ? 'dark' : 'light'}`}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout setIsDarkMode={setIsDarkMode} />}>
            <Route index={true} element={<Dashboard />} />
            <Route path='pages'>
              <Route path='about-us' element={<AboutUs />} />
            </Route>
            <Route path='navbar'>
              <Route path='navbar-settings' element={<Edit />} />
            </Route>
          </Route>
        </Routes>
      </Router>

    </div>
  )
}

export default App