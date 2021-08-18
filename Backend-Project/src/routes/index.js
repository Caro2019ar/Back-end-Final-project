import express from "express";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import routesAuth from "./routesAuth.js";
import productRoute from "./productos.js";
import cartRoute from "./carritos.js";
import orderRoute from "./ordenes.js";
import imageRoute from "./imagens.js";
import config from "../services/config.js";

const router = express.Router();

router.use(express.json());
router.use(
	express.urlencoded({
		extended: true,
	})
);

router.use(
	session({
		store: MongoStore.create({
			mongoUrl: config.MONGO_DB_URI,
			ttl: 600,
		}),
		secret: process.env.TOKEN_KEEP_ALIVE,
		resave: false,
		saveUninitialized: false,
		rolling: false,
		cookie: {
			maxAge: 600000,
		},
	})
);

router.use("/", routesAuth);
router.use("/api/image", imageRoute);

router.use(
	"/api/cart",
	passport.authenticate("jwt", { session: false }),
	cartRoute
);

router.use(
	"/api/orders",
	passport.authenticate("jwt", { session: false }),
	orderRoute
);

router.use("/api/products", productRoute);

// Handle all errors.
router.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({ err });
});
export default router;
