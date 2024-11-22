export const isValidToken = (token) => {

    const decodedToken = parseJwt(token);

    if (decodedToken && decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp < currentTime) {
            return false;
        } else
            return true;
    } else {
        console.log('Invalid token');
    }
};

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};