import Cookies from "js-cookie";
import { isValidToken } from "../utils/functions";

export const checkAuthToken = () => {
	const token = Cookies.get("accessToken");
	try {
		return isValidToken(token);
	} catch (error) {
		console.error("Error decoding token:", error);
		return false; // Return false if decoding fails or token is invalid
	}
};
