import mongoose from "mongoose";
import User from "../users/model";
import getErrors from "../utils/getErrors";
import {
	setConfirmationByEmailToken,
	sendConfirmationByEmail
} from "../utils/confirmationByEmailService";

export const signup = (req, res) => {
	console.log(req.body);
	const { payload } = req.body;
	const user = new User({
		email: payload.email,
		nickname: payload.nickname,
		password: payload.password,
		emailConfirmationToken: setConfirmationByEmailToken()
	});
	user.save(err => {
		if (err) {
			return res.status(400).json(getErrors(err.errors));
		}
		sendConfirmationByEmail(user);
		res.json({ signedUp: true });
	});
};
