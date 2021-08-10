import express from "express";
import passport from "passport";
const router = express.Router();
import { login, signup } from "../controllers/login.js";

router.post(
	"/api/user/signup",
	passport.authenticate("signup", { session: false }),
	signup
);

router.post("/api/user/login", login);

export default router;
