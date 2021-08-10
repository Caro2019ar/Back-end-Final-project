import express from "express";

import {
	getCart,
	addToCart,
	deleteItem,
	submitOrder,
} from "../controllers/carritos.js";

const router = express.Router();
router.get("/", getCart);

router.post("/add", addToCart);

router.post("/delete", deleteItem);

router.post("/submit", submitOrder);

export default router;
