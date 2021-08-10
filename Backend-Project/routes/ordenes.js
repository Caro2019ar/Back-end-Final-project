import express from "express";
const router = express.Router();

import { getOrder, getOrderId, completeOrder } from "../controllers/orden.js";

router.get("/", getOrder);

router.get("/:orderId", getOrderId);

router.post("/complete", completeOrder);

export default router;
