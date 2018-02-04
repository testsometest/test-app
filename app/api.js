import axios from "axios";
import { getToken } from "./utils/authService";

const rootUrl = "http://localhost:3000";//"http://ed90663c.ngrok.io";

export default {
	signup: payload => axios.post(`${rootUrl}/api/signup`, { payload }),
	login: payload => axios.post(`${rootUrl}/api/auth`, { payload }),
	confirmation: confirmationToken =>
		axios.post(`${rootUrl}/api/confirmation`, { confirmationToken }),
	checkPassword: payload =>
		axios.post(`${rootUrl}/api/users/check-password`, payload, {
			headers: { Authorization: `Bearer ${getToken()}` }
		}),
	changePassword: payload =>
		axios.post(
			`${rootUrl}/api/users/change-password`,
			{ payload },
			{ headers: { Authorization: `Bearer ${getToken()}` } }
		),
	setNewPassword: payload =>
		axios.post(`${rootUrl}/api/forget-password/set-new-password`, { payload }),
	forgetPassword: payload =>
		axios.post(`${rootUrl}/api/forget-password`, { payload })
};
