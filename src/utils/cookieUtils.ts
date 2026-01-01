import Cookies from "js-cookie";

const TOKEN_KEY = "accessToken";

const getExpiryDate = (seconds: number) => {
    const date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    return date;
};

export const setTokenInCookie = (token: string) => {
    Cookies.set(TOKEN_KEY, token, { expires: getExpiryDate(((60 * 1000) * 60) * 12) }); // 12 ชม.
};

export const setSocialInCookie = (val: string) => {
    Cookies.set("social", val, { expires: 7 }); // 7 วัน
};

export const setUsernameInCookie = (username: string) => {
    Cookies.set("username", username, { expires: 1 }); // 1 วัน
};

export const getUsernameFromCookie = (): string => {
    return Cookies.get("username") || "";
};

export const getSocialFromCookie = (): string => {
    return Cookies.get("social") || "";
};

export const getTokenFromCookie = (): string | null => {
    return Cookies.get(TOKEN_KEY) || null;
};

export const removeTokenFromCookie = () => {
    Cookies.remove(TOKEN_KEY);
};
