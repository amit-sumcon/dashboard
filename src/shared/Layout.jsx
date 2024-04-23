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
            <div className='w-full flex flex-col'>
                <div className='pt-5 w-full px-5 bg-white xl:mr-60 dark:bg-slate-900'>
                    <Navbar setIsDarkMode={setIsDarkMode} setIsMenu={setIsMenu} />
                </div>
                <div className='flex-1 pt-5 pl-5 pr-1 overflow-y-scroll'>
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