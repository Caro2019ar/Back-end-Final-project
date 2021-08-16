import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { CarritoModel } from "../models/model.js";
import { validationSignup } from "../controllers/validacion.js";

export const signup = async (req, res, next) => {
	const userId = req.user._id;
	const email = req.user.email;

	try {
		const carritoNuevo = new CarritoModel({
			userId: userId,
		});
		const creado = await carritoNuevo.save();
		const userOK = await User.findOne({ email: email });

		res.status(201).json({
			message: "Signup successful",
			creadoCarrito: creado,
			usuarioCadastrado: userOK,
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
			//Problema aqui para Swagger identificar user
			if (!user && info) {
				return res.status(401).json({ message: info.message });
			}

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, email: user.email };
				const token = jwt.sign({ user: body }, "TOP_SECRET");

				return res.status(200).json({ message: token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
};
