import {
	getProducts,
	getProductPorId,
	postProducts,
	patchProductId,
	deleteProductId,
} from "../controllers/producto.js";

import express from "express";
import { isAdminFunc } from "../middleware/auth.js";
import passport from "passport";
const passportOK = passport.authenticate("jwt", { session: false });

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductPorId);
router.post("/", passportOK, isAdminFunc, postProducts);
router.patch("/:id", passportOK, isAdminFunc, patchProductId);
router.delete("/:id", passportOK, isAdminFunc, deleteProductId);

export default router;
