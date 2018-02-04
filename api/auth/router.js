import express from "express";
import { authenticate } from "./controller";
const router = express.Router();

router.post("/", authenticate);

export default router;
