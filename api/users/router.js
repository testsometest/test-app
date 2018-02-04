import express from "express";
const router = express.Router();
import { passwordCheck, changePassword } from "./controller";

router.post("/check-password", passwordCheck);
router.post("/change-password", changePassword);

export default router;
