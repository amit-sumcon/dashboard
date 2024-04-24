import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

function SideNav({ isMenu, setIsMenu }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLocked, setIsLocked] = useState(true);

    const isLargeView = useMediaQuery({ query: '(min-width: 1024px)' })

    const handleMenuOpen = () => {
        setIsMenu(false)
    }

    const handleCollapsed = () => {
        setIsLocked(prev => !prev);
    };

    useEffect(() => {
        const handleMouseOver = () => {
            setIsCollapsed(false);
        };

        const handleMouseOut = () => {
            setIsCollapsed(true);
        };

        const sidebar = document.getElementById('sidebar');

        if (!isLocked && sidebar) {
            sidebar.addEventListener('mouseover', handleMouseOver);
            sidebar.addEventListener('mouseout', handleMouseOut);

            return () => {
                sidebar.removeEventListener('mouseover', handleMouseOver);
                sidebar.removeEventListener('mouseout', handleMouseOut);
            };
        }
    }, [isLocked, isCollapsed]);

    const location = useLocation();

    // Function to check if a link is active
    const isActive = (path) => {
        return location.pathname === path;
    };
    return (
        <div
            className={`${isCollapsed ? 'w-20 duration-200 transition-all ease-in' : 'w-64 transition-all duration-300 ease-out'} h-screen bg-sky-900 text-white dark:bg-slate-900 dark:text-white ${!isMenu && !isLargeView && 'hidden'} absolute z-50 lg:static lg:z-0`}
            id='sidebar'
        >
            <div className='flex justify-between items-center gap-16 pt-6 pb-3 px-4 dark:bg-slate-900'>
                <div className='flex items-center gap-2'>
                    <span className={`${isCollapsed && 'hidden'} text-xl font-bold`}>Thrive</span>
                </div>
                {
                    isLargeView
                        ? <div className={`${isCollapsed && 'hidden transition-all duration-200'} cursor-pointer`} onClick={handleCollapsed}>
                            {
                                isLocked
                                    ? <i className='bx bx-radio-circle-marked text-3xl'></i>
                                    : <i className='bx bx-radio-circle text-3xl'></i>
                            }
                        </div>
                        : <div className='lg:hidden cursor-pointer' onClick={handleMenuOpen}>
                            {
                                isMenu && <i className='bx bx-x text-2xl dark:text-white'></i>
                            }
                        </div>
                }
            </div>
            <div className='w-full h-full overflow-y-scroll no-scrollbar'>
                <div className='flex flex-col gap-4 mb-20 mt-5 pl-6 w-full'>
                    <LinkItem isActive={isActive('/')} isCollapsed={isCollapsed} label="DashBoard" path="/" icon_name="home-smile" />
                    <div className='flex flex-col gap-3 w-full'>
                        <span className={`${isCollapsed && 'hidden'} text-sm text-gray-500`}>Pages</span>
                        <LinkItem isActive={isActive('/pages/hero')} isCollapsed={isCollapsed} path="/pages/hero" label="Hero" icon_name="list-ol" />
                        <div className='flex items-center gap-3'>
                            <i className='bx bx-list-ol text-2xl' ></i>
                            <Link to="/pages/hero" className={`${isCollapsed && 'hidden'}`}>Hero</Link>
                        </div>
                        <div className='flex items-center gap-3'>
                            <i className='bx bx-list-ol text-2xl' ></i>
                            <Link to="/pages/about-us" className={`${isCollapsed && 'hidden'}`}>About Us</Link>
                        </div>
                        <div className='flex items-center gap-3'>
                            <i className='bx bx-list-ol text-2xl' ></i>
                            <Link to="/pages/services" className={`${isCollapsed && 'hidden'}`}>Service</Link>
                        </div>
                        <div className='flex items-center gap-3'>
                            <i className='bx bx-list-ol text-2xl' ></i>
                            <Link to="/pages/why-choose-us" className={`${isCollapsed && 'hidden'}`}>Why Choose Us</Link>
                        </div>
                        <div className='flex items-center gap-3'>
                            <i className='bx bx-list-ol text-2xl' ></i>
                            <Link to="/pages/testimonials" className={`${isCollapsed && 'hidden'}`}>Testimonials</Link>
                        </div>
                        <div className='flex items-center gap-3'>
                            <i className='bx bx-list-ol text-2xl' ></i>
                            <Link to="/pages/contact-us" className={`${isCollapsed && 'hidden'}`}>Contact Us</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 w-full'>
                        <span className={`${isCollapsed && 'hidden'} text-sm text-gray-500`}>User</span>
                        <div className='flex items-center gap-3'>
                            <i className='bx bx-list-ol text-2xl' ></i>
                            <Link to="/user/list" className={`${isCollapsed && 'hidden'}`}>List</Link>
                        </div>
                        <div className='flex items-center gap-3'>
                            <i className='bx bx-street-view text-2xl'></i>
                            <Link to="/user/view" className={`${isCollapsed && 'hidden'}`}>View</Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 w-full'>
                        <span className={`${isCollapsed && 'hidden'} text-sm text-gray-500`}>Roles & Permissions</span>
                        <LinkItem isActive={isActive('/navbar/navbar-settings')} isCollapsed={isCollapsed} label="Navbar Settings" path="/navbar/navbar-settings" icon_name="list-ol" />

                        <div className='flex items-center gap-3'>
                            <i className='bx bx-lock-alt text-2xl' ></i>
                            <Link to="/roles-permissions/permissions" className={`${isCollapsed && 'hidden'}`}>Permissions</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideNav

const LinkItem = ({ isCollapsed, path, isActive, label, icon_name }) => {
    return (
        <div className='relative'>
            <div className={`flex items-center gap-3 text-white py-2 px-3 rounded-s-xl ${isActive ? "rounded-custom" : ""}`}>
                <i className={`bx bx-${icon_name} text-2xl`}></i>
                <Link to={path} className={`${isCollapsed && 'hidden'}`}>{label}</Link>
            </div>
        </div>
    )
}