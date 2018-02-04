import User from "../users/model";
import {
	setConfirmationByEmailToken,
	sendConfirmationByEmail
} from "../utils/confirmationByEmailService";
import { isEmail } from "validator";
import getErrors from "../utils/getErrors";

export const forgetPassword = (req, res) => {
	const { email } = req.body.payload;
	if (!isEmail(email)) {
		return res.status(400).json({ message: "Invalid email" });
	}
	const accessToSetNewPassword = true;

	User.findOne({ email: email })
		.exec()
		.then(user => {
			if (user) {
				user.emailConfirmationToken = setConfirmationByEmailToken();
				user.isConfirmed = false;
				user
					.save()
					.then(user => {
						sendConfirmationByEmail(user, accessToSetNewPassword);
						res.json({ forgetPassword: true });
					})
					.catch(err => console.log(err));
			} else {
				res.status(400).json({ message: "Wrong email" });
			}
		})
		.catch(err => console.log(err));
};

export const setNewPassword = (req, res) => {
	const { userId, newPassword } = req.body.payload;

	User.findOne({ _id: userId })
		.exec()
		.then(user => {
			if (user && !user.isConfirmed) {
				user.emailConfirmationToken = "";
				user.isConfirmed = true;
				user.password = newPassword;
				user
					.save()
					.then(user => res.send({ setNewPassword: true }))
					.catch(err => res.status(400).json(getErrors(err.errors)));
			} else {
				res.status(400).send({ message: "No user with such email" });
			}
		})
		.catch(err => console.log(err));
};
