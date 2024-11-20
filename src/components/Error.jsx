import React from "react";

const Error = ({ msg }) => {
	return (
		<div className="text-sm text-red-500 mt-1">
			<span>{msg}</span>
		</div>
	);
};

export default Error;
