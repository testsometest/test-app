import express from "express";
import { confirmation } from "./controller";

const router = express.Router();

router.post("/", confirmation);

export default router;
