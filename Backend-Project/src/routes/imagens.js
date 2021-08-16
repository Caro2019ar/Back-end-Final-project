import upload from "../middleware/upload.js";
import express from "express";
import Grid from "gridfs-stream";
import mongoose from "mongoose";
import passport from "passport";
import UserModel from "../models/user.js";

const router = express.Router();
let gfs;

const conn = mongoose.connection;
conn.once("open", function () {
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection("Images");
});

router.post(
	"/upload",
	passport.authenticate("jwt", { session: false }),
	upload.single("file"),
	async (req, res) => {
		try {
			const user = await UserModel.findOne({ email: req.user.email });
			if (user.isAdmin) {
				console.log("req", req);
				if (req.file === undefined) return res.send("you must select a file.");
				const imgUrl = `http://localhost:8080/api/image/${req.file.id}`;
				return res.send(imgUrl);
			} else {
				res.status(401).send({ message: "Token is not valid for admin user" });
			}
		} catch (error) {
			console.log(error);
			res.send("An error occured.");
		}
	}
);

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const file = await gfs.files.find({ _id: id });
		if (!file) {
			res.status(404).send("not found");
		} else {
			const readStream = await gfs.createReadStream({ _id: id });
			readStream.pipe(res);
		}
	} catch (error) {
		res.send("An error occured.");
	}
});

// "gfs.files delete solo funciona con filename";
router.delete(
	"/:filename",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		try {
			const user = await UserModel.findOne({ email: req.user.email });
			if (user.isAdmin) {
				await gfs.files.deleteOne({ filename: req.params.filename });
				res.status(200).send("Se elimino la imagen");
			} else {
				res.status(401).send({ message: "Token is not valid for admin user" });
			}
		} catch (error) {
			console.log(error);
			res.send("An error occured.");
		}
	}
);

export default router;
