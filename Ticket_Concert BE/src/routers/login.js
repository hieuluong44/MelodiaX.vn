import express from "express";
import { loginUser,registerUser } from "../controllers/login.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register",registerUser);

export default router;
