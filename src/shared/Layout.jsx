import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from '../components/SideNav';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Layout({ setIsDarkMode }) {
    const [isMenu, setIsMenu] = useState(false);

    return (
        <div className='flex h-screen w-full dark:bg-slate-900 overflow-hidden'>
            <div className='dark:bg-slate-900'>
                <SideNav isMenu={isMenu} setIsMenu={setIsMenu} />
            </div>
            <div className='w-full flex flex-col overflow-y-scroll px-3 pt-3'>
                <Navbar setIsDarkMode={setIsDarkMode} setIsMenu={setIsMenu} />
                <div className='flex-1 mt-3'>
                    <div className='min-h-screen'>
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>

    );
}

export default Layout;