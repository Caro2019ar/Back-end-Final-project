import passport from "passport";
import UserModel from "../models/user.js";
import localStrategy from "passport-local";
import JWTstrategy from "passport-jwt";
import ExtractJWT from "passport-jwt";
import { validationSignup } from "../controllers/validacion.js";

const localStrategyPL = localStrategy.Strategy;
const JWTstrategyPJ = JWTstrategy.Strategy;
const ExtractJWTPJ = ExtractJWT.ExtractJwt;

const strategyOptionsSignUp = {
	usernameField: "email",
	passwordField: "password",
	passReqToCallback: true,
};

const strategyOptions = {
	usernameField: "email",
	passwordField: "password",
};
const strategyJWT = {
	secretOrKey: process.env.JWT_SECRET_KEY,
	jwtFromRequest: ExtractJWTPJ.fromAuthHeaderAsBearerToken(),
};

const signup = async (req, email, password, done) => {
	try {
		const { nombre, telefono, isAdmin, direccion, passwordRepeat } = req.body;
		const { calle, altura, codigoPostal } = direccion;
		const user = await new UserModel({
			email,
			password,
			passwordRepeat,
			nombre,
			telefono,
			isAdmin,
			direccion: { calle, altura, codigoPostal },
		});
		const creado = await user.save();
		const userOK = await UserModel.findOne({ email: email });
		return done(null, userOK);
	} catch (error) {
		done(error);
	}
};

const login = async (email, password, done) => {
	try {
		const user = await UserModel.findOne({ email: email });

		if (!user) {
			return done(null, false, { message: "User not found" });
		}

		const validate = await user.isValidPassword(password);

		if (!validate) {
			return done(null, false, { message: "Wrong Password" });
		}

		return done(null, user, { message: "Logged in Successfully" });
	} catch (error) {
		console.log("Erro no login", error);
		return done(error);
	}
};

// Passport middleware to handle user registration

passport.use("signup", new localStrategyPL(strategyOptionsSignUp, signup));

// Passport middleware to handle user login

passport.use("login", new localStrategyPL(strategyOptions, login));

passport.use(
	new JWTstrategyPJ(strategyJWT, async (token, done) => {
		try {
			return done(null, token.user);
			console.log("token.user--------", token.user);
		} catch (error) {
			done(error);
		}
	})
);

export const isAdminFunc = async (req, res, next) => {
	const userId = req.user._id;
	try {
		const encontrarUsuario = await UserModel.findOne({ _id: userId });
		const isAdmin = encontrarUsuario.isAdmin;
		if (isAdmin) {
			next();
		} else {
			return res
				.status(401)
				.send({ message: "Solo permitido a administradores" });
		}
	} catch (error) {
		return res
			.status(401)
			.send({ message: "Solo permitido a administradores" });
	}
};

export default passport;
