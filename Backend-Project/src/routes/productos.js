import {
	getProducts,
	getProductPorId,
	getProductsCategory,
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
router.get("/porid/:id", getProductPorId);
router.get("/:category", getProductsCategory);
router.post("/", passportOK, isAdminFunc, postProducts);
router.patch("/:id", passportOK, isAdminFunc, patchProductId);
router.delete("/:id", passportOK, isAdminFunc, deleteProductId);

export default router;
