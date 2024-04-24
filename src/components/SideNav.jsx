import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const pages = [
    { label: "Hero Section", path: "/pages/hero-section" },
    { label: "About Us", path: "/pages/about-us" },
    { label: "Courses", path: "/pages/courses" },
    { label: "Pricing Page", path: "/pages/pricing-page" },
    { label: "Why Us", path: "/pages/why-us" },
    { label: "Client Data", path: "/pages/client-data" },
    { label: "Why Best Option", path: "/pages/why-best-option" },
    { label: "Faculty Excellence", path: "/pages/faculty-excellence" },
    { label: "FAQ", path: "/pages/faq" },
    { label: "Success Stories", path: "/pages/success-stories" },
    { label: "Subscribe", path: "/pages/subscribe" },
]

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
            className={`${isCollapsed ? 'w-24 duration-200 transition-all ease-in' : 'w-64 transition-all duration-300 ease-out'} h-screen bg-sky-900 text-white dark:bg-slate-900 dark:text-white ${!isMenu && !isLargeView && 'hidden'} absolute z-50 lg:static lg:z-0`}
            id='sidebar'
        >
            <div className='flex justify-between items-center gap-16 pt-6 pb-3 px-4 dark:bg-slate-900'>
                <div className='flex items-center gap-2'>
                    <span className={`text-xl font-bold`}>Thrive</span>
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
                    <LinkItem isActive={isActive('/')} label="DashBoard" path="/" icon_name="home-smile" />
                    <div className='flex flex-col gap-3 w-full'>
                        <div className='flex flex-col gap-3 w-full'>
                            <span className={`${isCollapsed && 'hidden'} text-sm text-gray-400`}>Pages</span>
                            {
                                pages.map((item, index) => (
                                    <LinkItem isActive={isActive(item.path)} path={item.path} label={item.label} icon_name="list-ol" key={index} />
                                ))
                            }
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <span className={`${isCollapsed && 'hidden'} text-sm text-gray-400`}>Settings</span>
                            <LinkItem isActive={isActive('/settings/navbar-setting')} label="Navbar Settings" path="/settings/navbar-setting" icon_name="list-ol" />
                            <LinkItem isActive={isActive('/settings/footer-setting')} label="Footer Settings" path="/settings/footer-setting" icon_name="list-ol" />
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <span className={`${isCollapsed && 'hidden'} text-sm text-gray-400`}>User</span>
                            <LinkItem isActive={isActive('/user/list')} label="List" path="/user/list" icon_name="list-ol" />
                            <LinkItem isActive={isActive('/user/view')} label="View" path="/user/view" icon_name="street-view" />
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <span className={`${isCollapsed && 'hidden'} text-sm text-gray-400`}>Roles & Permissions</span>
                            <LinkItem isActive={isActive('/roles-permissions/roles')} label="Roles" path="/roles-permissions/roles" icon_name="check-shield" />
                            <LinkItem isActive={isActive('/roles-permissions/permissions')} label="Permissions" path="/roles-permissions/permissions" icon_name="lock-alt" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideNav

const LinkItem = ({ path, isActive, label, icon_name }) => {
    return (
        <Link to={path} className='relative'>
            <div className={`flex items-center gap-3 cursor-pointer text-white py-2 px-3 rounded-s-xl hover:bg-white hover:text-sky-900 duration-300 ${isActive ? "rounded-custom" : ""}`}>
                <i className={`bx bx-${icon_name} text-2xl`}></i>
                <span>{label}</span>
            </div>
        </Link>
    )
}