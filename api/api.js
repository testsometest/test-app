import express from "express";
import signUpRouter from "./signup/router";
import confirmationRouter from "./confirmation/router";
import authRouter from "./auth/router";
import usersRouter from "./users/router";
import forgetPasswordRouter from "./forgetPassword/router";
import verifyCredentials from "./utils/verifyCredentials";
import authCheck from "./utils/authCheck";

const router = express.Router();

router.use("/signup", signUpRouter);
router.use("/auth", verifyCredentials, authRouter);
router.use("/confirmation", confirmationRouter);
router.use("/users", authCheck, usersRouter);
router.use("/forget-password", forgetPasswordRouter);

export default router;
