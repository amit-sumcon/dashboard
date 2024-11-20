import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import HeroSection from '../pages/HeroSection';
import AboutUs from '../pages/AboutUs';
import Courses from '../pages/Courses';
import PricingPage from '../pages/PricingPage';
import WhyUs from '../pages/WhyUs';
import ClientData from '../pages/ClientData';
import WHyBestOption from '../pages/WHyBestOption';
import FacultyExcellence from '../pages/FacultyExcellence';
import Faq from '../pages/Faq';
import SuccessStories from '../pages/SuccessStories';
import Subscribe from '../pages/Subscribe';
import FooterSettings from '../pages/FooterSettings';
import List from '../pages/List';
import View from '../pages/View';
import Roles from '../pages/Roles';
import Permissions from '../pages/Permissions';
import Layout from '../shared/Layout';
import Edit from '../components/Edit';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from '../pages/Login';

function AppRouter({ setIsDarkMode }) {
  return (
    <Routes>
      <Route path='/login' element={<Login />} /> {/* Public route */}

      <Route path='/' element={<Layout setIsDarkMode={setIsDarkMode} />}>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
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

          {/* Settings Routes */}
          <Route path='settings'>
            <Route path='navbar-setting' element={<Edit />} />
            <Route path='footer-setting' element={<FooterSettings />} />
          </Route>

          {/* User Routes */}
          <Route path='user'>
            <Route path='list' element={<List />} />
            <Route path='view' element={<View />} />
          </Route>

          {/* Roles and Permissions Routes */}
          <Route path='roles-permissions'>
            <Route path='roles' element={<Roles />} />
            <Route path='permissions' element={<Permissions />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
