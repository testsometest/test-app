import express from "express";
import { forgetPassword, setNewPassword } from "./controller";

const router = express.Router();

router.post("/", forgetPassword);
router.post("/set-new-password", setNewPassword);

export default router;
