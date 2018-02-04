import express from "express";
import { signup } from "./controller";

const router = express.Router();

router.post("/", signup);

export default router;
