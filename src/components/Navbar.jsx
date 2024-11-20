import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Navbar({ setIsMenu }) {
	const [isShow, setIsShow] = useState(false);
	const dropdownRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setIsShow(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleShow = () => {
		setIsShow(!isShow);
	};

	const handleLogout = async () => {
		Cookies.remove("accessToken");
		navigate("/login");
	};

	return (
		<nav
			className="relative w-full py-3 shadow-md border rounded-md px-5 md:px-10"
			ref={dropdownRef}
		>
			<div className="w-full h-full flex justify-between items-center">
				<div className="w-fit h-full flex items-center gap-3">
					<div
						className="lg:hidden"
						onClick={() => {
							setIsMenu(true);
						}}
					>
						<i className="bx bx-menu text-3xl cursor-pointer"></i>
					</div>
				</div>
				<div className="flex items-center gap-10 md:gap-5">
					<div className="cursor-pointer" onClick={handleShow}>
						<i className="bx bxs-user-circle text-2xl"></i>
					</div>
				</div>
			</div>
			<div
				className={`absolute w-52 h-40 flex flex-col gap-3 right-0 bottom-[-170px] py-4 px-4 rounded-md border shadow-md bg-white ${
					isShow ? "block" : "hidden"
				}`}
			>
				<Link to="/" className="flex items-center gap-3">
					<i className="bx bx-user text-2xl"></i>
					<span className="text-base">Profile</span>
				</Link>
				<Link to="/" className="flex items-center gap-3">
					<i className="bx bx-lock-open-alt text-2xl"></i>
					<span className="text-base">Change Password</span>
				</Link>
				<button
					onClick={handleLogout}
					className="flex items-center gap-3"
				>
					<i className="bx bx-log-out text-2xl"></i>
					<span className="text-base">Logout</span>
				</button>
			</div>
		</nav>
	);
}

export default Navbar;
