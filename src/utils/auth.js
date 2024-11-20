import Cookies from "js-cookie";

export const checkAuthToken = () => {
  const token = Cookies.get("accessToken"); // Get the token from cookies
  if (!token) return false; // No token found

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
    const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
    return decodedToken.exp > currentTime; // Return true if the token is not expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return false; // Return false if decoding fails or token is invalid
  }
};
