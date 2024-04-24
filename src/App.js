import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Edit from './components/Edit';
import AboutUs from './pages/AboutUs';
import Dashboard from './pages/Dashboard';
import Layout from './shared/Layout';
import HeroSection from './pages/HeroSection';
import Courses from './pages/Courses';
import PricingPage from './pages/PricingPage';
import WhyUs from './pages/WhyUs';
import ClientData from './pages/ClientData';
import WHyBestOption from './pages/WHyBestOption';
import FacultyExcellence from './pages/FacultyExcellence';
import Faq from './pages/Faq';
import SuccessStories from './pages/SuccessStories';
import Subscribe from './pages/Subscribe';
import FooterSettings from './pages/FooterSettings';
import List from './pages/List';
import View from './pages/View';
import Roles from './pages/Roles';
import Permissions from './pages/Permissions';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  return (
    <div className={`${isDarkMode ? 'dark' : 'light'}`}>
      <Router>
        <Routes>
          <Route path='/' element={<Layout setIsDarkMode={setIsDarkMode} />}>
            <Route index={true} element={<Dashboard />} />
            <Route path='pages'>
              <Route path='hero-section' element={<HeroSection />} />
              <Route path='about-us' element={<AboutUs />} />
              <Route path='courses' element={<Courses />} />
              <Route path='pricing-page' element={<PricingPage />} />
              <Route path='why-us' element={<WhyUs />} />
              <Route path='client-data' element={<ClientData />} />
              <Route path='why-best-option' element={<WHyBestOption />} />
              <Route path='faculty-excellence' element={<FacultyExcellence />} />
              <Route path='faq' element={<Faq />} />
              <Route path='success-stories' element={<SuccessStories />} />
              <Route path='subscribe' element={<Subscribe />} />
            </Route>
            <Route path='settings'>
              <Route path='navbar-setting' element={<Edit />} />
              <Route path='footer-setting' element={<FooterSettings />} />
            </Route>
            <Route path='user'>
              <Route path='list' element={<List />} />
              <Route path='view' element={<View />} />
            </Route>
            <Route path='roles-permissions'>
              <Route path='roles' element={<Roles />} />
              <Route path='permissions' element={<Permissions />} />
            </Route>
          </Route>
        </Routes>
      </Router>

    </div>
  )
}

export default App