import mongoose from "mongoose";
import User from "../users/model";

export const confirmation = (req, res) => {
	const { confirmationToken } = req.body;
	console.log("confirmationToken", confirmationToken);
	User.findOneAndUpdate(
		{ emailConfirmationToken: confirmationToken },
		{ emailConfirmationToken: "", isConfirmed: true },
		{ new: true }
	)
		.then(
			user =>
				user
					? res.json({ isConfirmed: true })
					: res.json({ isConfirmed: false })
		)
		.catch(err => console.log(err));
};
