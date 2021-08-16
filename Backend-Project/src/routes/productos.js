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

const router = express.Router();

router.get("/", getProducts);
router.get("/porid/:id", getProductPorId);
router.get("/:category", getProductsCategory);
router.post("/", isAdminFunc, postProducts);
router.patch("/:id", isAdminFunc, patchProductId);
router.delete("/:id", isAdminFunc, deleteProductId);

export default router;
