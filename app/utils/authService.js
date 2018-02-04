import decode from "jwt-decode";
import { isTokenExpired } from "./jwtHelper";

export const isAuthenticated = () => {
	const token = localStorage.getItem("token");
	if (token) {
		return !isTokenExpired(token);
	} else {
		return false;
	}
};

export const finishAuthentication = token =>
	localStorage.setItem("token", token);

export const logout = () => localStorage.removeItem("token");

export const getToken = () => localStorage.getItem("token");
