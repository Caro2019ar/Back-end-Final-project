import express from "express";
import passport from "passport";
const router = express.Router();
import { login, signup } from "../controllers/login.js";
import { validationSignup } from "../controllers/validacion.js";

router.post(
	"/api/user/signup",
	passport.authenticate("signup", { session: false }),
	validationSignup,
	signup
);

router.post("/api/user/login", login);

export default router;
