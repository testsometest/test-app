import User from "./model";
import getErrors from "../utils/getErrors";
import {
	setConfirmationByEmailToken,
	sendConfirmationByEmail
} from "../utils/confirmationByEmailService";

export const passwordCheck = (req, res) => {
	const { payload, decoded } = req.body;
	const { password } = payload;
	const id = decoded.id;

	User.findOne({ _id: id })
		.exec()
		.then(user => {
			if (user && user.isValidPassword(password)) {
				res.send({ passwordCheck: true });
			} else {
				res.status(400).json({ message: "Wrong password" });
			}
		})
		.catch(err => console.log(err));
};

export const changePassword = (req, res) => {
	const { payload, decoded } = req.body;
	const { currentPassword, newPassword } = payload;
	const id = decoded.id;

	User.findOne({ _id: id })
		.exec()
		.then(user => {
			if (user && user.isValidPassword(currentPassword)) {
				console.log("change password", user);
				user.password = newPassword;
				user.emailConfirmationToken = setConfirmationByEmailToken();
				user.isConfirmed = false;
				user
					.save()
					.then(user => {
						sendConfirmationByEmail(user);
						res.send({ passwordHasBeenChanged: true });
					})
					.catch(err => console.log(err));
			} else {
				console.log("error change password");
				res.status(400).json({ message: `Wrong credentials` });
			}
		})
		.catch(err => console.log(err));
};
