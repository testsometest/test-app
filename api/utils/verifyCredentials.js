import express from "express";
import User from "../users/model";

const verifyCredentials = (req, res, next) => {
	const { email, password } = req.body.payload;
	User.findOne({ email: email })
		.exec()
		.then(user => {
			if (user && user.isValidPassword(password) && user.isConfirmed) {
				user.emailConfirmationToken = "";
				req.body.user = user;
				next();
			} else {
				if (user && user.isValidPassword(password) && !user.isConfirmed) {
					res.status(400).json({ message: "Need confirmation email" });
				} else {
					res.status(400).json({ message: "Wrong password or email" });
				}
			}
		})
		.catch(err => console.log(err));
};

export default verifyCredentials;
