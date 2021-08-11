import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { CarritoModel } from "../models/model.js";
import { validationSignup } from "../controllers/validacion.js";

export const signup = async (req, res, next) => {
	const userId = req.user._id;

	try {
		const carritoNuevo = new CarritoModel({
			userId: userId,
		});
		const creado = await carritoNuevo.save();
		res.json({
			message: "Signup successful",
			creadoCarrito: creado,
		});
		// }
	} catch (error) {
		return next(error);
	}
};

export const login = async (req, res, next) => {
	passport.authenticate("login", async (err, user, info) => {
		try {
			if (err) {
				const error = new Error("An error occurred.");
				return next(error);
			}

			if (!user && info) {
				return res.status(401).json({ message: info.message });
			}

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, email: user.email };
				const token = jwt.sign({ user: body }, "TOP_SECRET");

				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
};
