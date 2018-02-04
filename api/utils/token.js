const secret = "secret";
import jwt from "jsonwebtoken";

export const createToken = user => {
	return jwt.sign(
		{
			id: user.id,
			username: user.nickname
		},
		secret,
		{
			algorithm: "HS256"
		}
	);
};

export const extractToken = req => {
	let token;
	console.log("extractToken", req.headers.authorization);
	if (
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] === "Bearer"
	) {
		return (token = req.headers.authorization.split(" ")[1]);
	} else {
		return (token = null); 
	}
};
