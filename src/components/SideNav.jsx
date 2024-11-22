import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

// Define navigation items
const management = [
	{
		label: "Tasks",
		path: "/tasks",
		icon: "task",
	},
];

const userNav = [
	{
		label: "List",
		path: "/user/list",
		icon: "list-ol",
	},
	{
		label: "View",
		path: "/user/view",
		icon: "street-view",
	},
];

const rolesPermissionsNav = [
	{
		label: "Roles",
		path: "/roles-permissions/roles",
		icon: "check-shield",
	},
	{
		label: "Permissions",
		path: "/roles-permissions/permissions",
		icon: "lock-alt",
	},
];

function SideNav({ isMenu, setIsMenu }) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isLocked, setIsLocked] = useState(true);

	const isLargeView = useMediaQuery({ query: "(min-width: 1024px)" });
	const { user } = useSelector((state) => state.user); // Access user info from Redux

	const handleMenuOpen = () => {
		setIsMenu(false);
	};

	const handleCollapsed = () => {
		setIsLocked((prev) => !prev);
	};

	useEffect(() => {
		const handleMouseOver = () => {
			setIsCollapsed(false);
		};

		const handleMouseOut = () => {
			setIsCollapsed(true);
		};

		const sidebar = document.getElementById("sidebar");

		if (!isLocked && sidebar) {
			sidebar.addEventListener("mouseover", handleMouseOver);
			sidebar.addEventListener("mouseout", handleMouseOut);

			return () => {
				sidebar.removeEventListener("mouseover", handleMouseOver);
				sidebar.removeEventListener("mouseout", handleMouseOut);
			};
		}
	}, [isLocked, isCollapsed]);

	const location = useLocation();

	// Function to check if a link is active
	const isActive = (path) => {
		return location.pathname === path;
	};

	// Filter navigation items based on role
	const getRoleBasedNavItems = () => {
		const baseNav = [
			{ label: "Dashboard", path: "/", icon: "home-smile" },
			...management,
		];

		// Check user role
		if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") {
			return [...baseNav, ...userNav, ...rolesPermissionsNav]; // Include all options for admins
		}

		return baseNav; // Non-admin users see only Dashboard and MyTasks
	};

	const roleBasedNav = getRoleBasedNavItems();

	return (
		<div
			className={`${
				isCollapsed
					? "w-24 duration-200 transition-all ease-in"
					: "w-64 transition-all duration-300 ease-out"
			} h-screen bg-sky-900 text-white ${
				!isMenu && !isLargeView && "hidden"
			} absolute z-50 lg:static lg:z-0`}
			id="sidebar"
		>
			<div className="flex justify-between items-center gap-16 pt-6 pb-3 px-4">
				<div className="flex items-center gap-2">
					<span className={`text-xl font-bold`}>Sumcon</span>
				</div>
				{isLargeView ? (
					<div
						className={`${
							isCollapsed && "hidden transition-all duration-200"
						} cursor-pointer`}
						onClick={handleCollapsed}
					>
						{isLocked ? (
							<i className="bx bx-radio-circle-marked text-3xl"></i>
						) : (
							<i className="bx bx-radio-circle text-3xl"></i>
						)}
					</div>
				) : (
					<div
						className="lg:hidden cursor-pointer"
						onClick={handleMenuOpen}
					>
						{isMenu && (
							<i className="bx bx-x text-2xl dark:text-white"></i>
						)}
					</div>
				)}
			</div>
			<div className="w-full h-[630px] lg:h-full overflow-y-scroll hide-scrollbar">
				<div className="flex flex-col gap-4 mt-5 lg:mb-20 pl-6 w-full">
					{roleBasedNav.map((item, index) => (
						<LinkItem
							isActive={isActive(item.path)}
							path={item.path}
							label={item.label}
							icon_name={item.icon}
							key={index}
							isCollapsed={isCollapsed}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default SideNav;

const LinkItem = ({ path, isActive, label, icon_name, isCollapsed }) => {
	return (
		<Link to={path} className="relative">
			<div
				className={`flex items-center gap-3 cursor-pointer text-white py-2 px-3 rounded-s-xl hover:bg-white hover:text-sky-900 duration-300 ${
					isActive ? "rounded-custom" : ""
				}`}
			>
				<i className={`bx bx-${icon_name} text-2xl`}></i>
				<span className={`${isCollapsed && "hidden"}`}>{label}</span>
			</div>
		</Link>
	);
};
