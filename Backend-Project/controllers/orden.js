import { CarritoModel, ProductoModel, OrdenModel } from "../models/model.js";
import UserModel from "../models/user.js";
import { enviarMail } from "./../services/email/nodemailer-ethereal.js";

export const getOrder = async (req, res) => {
	const userId = req.user._id;
	try {
		const ordenes = await OrdenModel.find({ userId: userId }).lean();
		if (ordenes) {
			res.status(200).json({ Ordenes: ordenes });
		} else {
			res.json({ Orden: "Sin ordenes" });
		}
	} catch (error) {
		res.json({ Mensaje: "No se pudo buscar orden" });
	}
};

export const getOrderId = async (req, res) => {
	const userId = req.user._id;
	const { orderId } = req.params;
	try {
		const orden = await OrdenModel.find({ _id: orderId }).lean();
		if (orden) {
			res.status(200).json({ Orden: orden });
		} else {
			res.json({ Orden: "Sin ordenes" });
		}
	} catch (error) {
		res.json({ Mensaje: "No se pudo buscar la orden" });
	}
};

export const completeOrder = async (req, res) => {
	const userId = req.user._id;
	const userEMail = req.user.email;
	const { _id } = req.body;
	try {
		const orden = await OrdenModel.find({ _id: _id }).lean();
		if (orden[0].estado == "Generada") {
			const result = await OrdenModel.updateOne(
				{ _id: _id },
				{ $set: { estado: "Completada" } }
			).lean();
			const ordenActual = await OrdenModel.find({ _id: _id }).lean();
			const ordenPlain = JSON.stringify(ordenActual);
			// console.log("ordenPlain", ordenPlain);
			enviarMail(ordenPlain, userEMail);
			//----------------------------------------------------------------
			res.status(200).json({ Orden: "Orden completada" });
		} else {
			res.status(400).json({ Orden: "Sin ordenes generadas" });
		}
	} catch (error) {
		res.status(400).json({ Mensaje: "No se pudo completar la orden" });
	}
};
