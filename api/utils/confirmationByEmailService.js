import randomString from "randomstring";
import nodemailer from "nodemailer";

export const setConfirmationByEmailToken = () => randomString.generate();

const setupNodemailer = () =>
	nodemailer.createTransport({
		host: "smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "b722d9f6f4c553",
			pass: "4decdbb6f8e83d"
		}
	});

const generateConfirmationUrl = (
	confirmationToken,
	userId,
	forgetPassword = false
) =>
	forgetPassword
		? `http://ed90663c.ngrok.io/confirmation/new_password/${userId}/${confirmationToken}`
		: `http://ed90663c.ngrok.io/confirmation/${confirmationToken}`;

export const sendConfirmationByEmail = (user, forgetPassword = false) => {
	const { _id, emailConfirmationToken } = user;
	console.log("confirmationToken", emailConfirmationToken);
	const transport = setupNodemailer();
	const email = {
		from: "testapp@mail.com",
		to: user.email,
		subject: "Welcome to the test App",
		text: `
			Please confirm your actions.
			${generateConfirmationUrl(emailConfirmationToken, _id, forgetPassword)}`
	};
	transport.sendMail(email);
};
