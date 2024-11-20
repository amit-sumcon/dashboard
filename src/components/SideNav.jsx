import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const management = [
	{
		label: "Task Management",
		path: "/management/task-management",
		icon: "task",
	},
];

function SideNav({ isMenu, setIsMenu }) {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isLocked, setIsLocked] = useState(true);

	const isLargeView = useMediaQuery({ query: "(min-width: 1024px)" });

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
					<span className={`text-xl font-bold`}>Thrive</span>
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
					<LinkItem
						isActive={isActive("/")}
						label="DashBoard"
						path="/"
						icon_name="home-smile"
						isCollapsed={isCollapsed}
					/>
					<div className="flex flex-col gap-3 w-full">
						<div className="flex flex-col gap-3 w-full">
							<span
								className={`${
									isCollapsed && "hidden"
								} text-sm text-gray-400`}
							>
								Pages
							</span>
							{management.map((item, index) => (
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
						<div className="flex flex-col gap-3 w-full">
							<span
								className={`${
									isCollapsed && "hidden"
								} text-sm text-gray-400`}
							>
								User
							</span>
							<LinkItem
								isActive={isActive("/user/list")}
								label="List"
								path="/user/list"
								icon_name="list-ol"
								isCollapsed={isCollapsed}
							/>
							<LinkItem
								isActive={isActive("/user/view")}
								label="View"
								path="/user/view"
								icon_name="street-view"
								isCollapsed={isCollapsed}
							/>
						</div>
						<div className="flex flex-col gap-3 w-full">
							<span
								className={`${
									isCollapsed && "hidden"
								} text-sm text-gray-400`}
							>
								Roles & Permissions
							</span>
							<LinkItem
								isActive={isActive("/roles-permissions/roles")}
								label="Roles"
								path="/roles-permissions/roles"
								icon_name="check-shield"
								isCollapsed={isCollapsed}
							/>
							<LinkItem
								isActive={isActive(
									"/roles-permissions/permissions"
								)}
								label="Permissions"
								path="/roles-permissions/permissions"
								icon_name="lock-alt"
								isCollapsed={isCollapsed}
							/>
						</div>
					</div>
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
