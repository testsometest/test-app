import jwt from "jsonwebtoken";
import { extractToken } from "./token";

const authCheck = (req, res, next) => {
	const token = extractToken(req);
	console.log(token);
	jwt.verify(token, "secret", { algorithms: ["HS256"] }, (err, decoded) => {
		if (err) {
			console.log(err.message);
			res.status(401).send("Unauthorized"); //if extractToken returns false
		}
		if (decoded) {
			req.body.decoded = decoded;
			next();
		}
	});
};

export default authCheck;
