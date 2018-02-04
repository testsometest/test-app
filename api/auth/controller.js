import { createToken } from "../utils/token";

export const authenticate = (req, res) =>
	res.json({ token: createToken(req.body.user) });
