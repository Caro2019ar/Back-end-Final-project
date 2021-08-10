import { CarritoModel, ProductoModel, OrdenModel } from "../models/model.js";
import UserModel from "../models/user.js";
import { enviarMail } from "../services/email/nodemailer-ethereal.js";

export const getCart = async (req, res) => {
	const userId = req.user._id;

	try {
		const carrito = await CarritoModel.find({ userId: userId }).lean();

		if (carrito) {
			res.status(200).json({ Carrito: carrito });
		} else {
			res.json({ Carrito: "vacio" });
		}
	} catch (err) {
		res.json({ Mensaje: "No se pudo buscar carrito" });
	}
};

export const addToCart = async (req, res) => {
	const productIdBody = req.body._id;
	const cantidadBody = req.body.cantidad;
	const userId = req.user._id;
	const carrito = [];
	const itensDelCarrito = [];

	try {
		const carrito = await CarritoModel.find({ userId: userId }).lean();
		console.log("CARRRITO:----", carrito);
		if (carrito.length) {
			let itensDelCarrito = carrito[0].items;
			let carritoConItem = await CarritoModel.find({
				"items.productId": productIdBody,
			});
			const indexDelItem = itensDelCarrito.findIndex(
				(el) => el.productId == productIdBody
			);

			//TODO Se item encontrado no carrinho:
			if (indexDelItem !== -1) {
				itensDelCarrito[indexDelItem].productQty += cantidadBody;

				//TODO Se Não foi encontrado item no carrinho:
			} else if (indexDelItem == -1) {
				const itemNuevo = {
					productId: productIdBody,
					productQty: cantidadBody,
				};
				itensDelCarrito.push(itemNuevo);
			}
			const result = await CarritoModel.updateOne(
				{ userId: userId },
				{ $set: { items: itensDelCarrito } }
			);
			return res.status(200).json("Producto agregado al carrito ");
		} else {
			//TODO + Se não tiver carrinho (caso signup não crie o carrinho): Criar carrinho com produto e qtde do Body
			const carritoNuevo = new CarritoModel({
				userId: userId,
				items: [{ productId: productIdBody, productQty: cantidadBody }],
			});
			const creado = await carritoNuevo.save();
			console.log("Carrito creado", carritoNuevo, creado);
			return res.status(200).json(creado);
		}
	} catch (error) {
		return res.status(400).json("No se pudo crear");
	}
};

export const deleteItem = async (req, res) => {
	const productIdBody = req.body._id;
	const cantidadBody = req.body.cantidad;
	const userId = req.user._id;

	try {
		const carrito = await CarritoModel.find({ userId: userId });

		if (carrito.length) {
			let itensDelCarrito = carrito[0].items;
			let carritoConItem = await CarritoModel.find({
				"items.productId": productIdBody,
			});
			const indexDelItem = itensDelCarrito.findIndex(
				(el) => el.productId == productIdBody
			);

			if (indexDelItem !== -1) {
				if (itensDelCarrito[indexDelItem].productQty < cantidadBody) {
					return res
						.status(400)
						.json("Cantidad mayor que existente en el carrito");
				}
				itensDelCarrito[indexDelItem].productQty -= cantidadBody;
			} else if (indexDelItem == -1) {
				return res.status(400).json("Producto no encontrado el en carrito");
			}
			const result = await CarritoModel.updateOne(
				{ userId: userId },
				{ $set: { items: itensDelCarrito } }
			);
			return res.status(200).json(carrito);
		}
		return res.status(400).json("No tiene carrito");
	} catch (error) {
		return res.status(400).json("No se pudo borrar item");
	}
};

export const submitOrder = async (req, res) => {
	const userEMail = req.user.email;
	const userId = req.user._id;
	try {
		const carrito = await CarritoModel.find({ userId: userId }).lean();
		const productosBD = await ProductoModel.find({}).lean();
		if (carrito) {
			let newArrayDeIds = [];
			const itensDelCarrito = carrito[0].items;
			const itensDelCarritoCopy = [...itensDelCarrito];

			itensDelCarrito.forEach((item) => {
				newArrayDeIds.push(item.productId);
			});
			function searchPriceBD(productosBD, IdItemCarrito) {
				let indexProdBD = 0;
				indexProdBD = productosBD.findIndex((prod) => {
					return prod._id == IdItemCarrito;
				});

				if (indexProdBD != -1) {
					let precioBD = productosBD[indexProdBD].precio;
					return precioBD;
				}
				return;
			}
			function newArrayItensCart(itensDelCarritoCopy, newArrayDeIds) {
				//Voy a recorrer todo el array de itens del carrito que están en el NewArrayDeIds
				for (let index = 0; index < newArrayDeIds.length; index++) {
					let IdItemCarrito = newArrayDeIds[index].toString();
					//Mismo indice del array de itens del carrito:
					let price = searchPriceBD(productosBD, IdItemCarrito);
					itensDelCarritoCopy[index].productPrice = price;
				}
				return itensDelCarritoCopy;
			}
			const arrayProdPrice = newArrayItensCart(
				itensDelCarritoCopy,
				newArrayDeIds
			);

			let total = arrayProdPrice.reduce(
				(accum, item) => accum + item.productQty * item.productPrice,
				0
			);

			const ordenNueva = new OrdenModel({
				userId: userId,
				items: [...arrayProdPrice],
				total: total,
			});
			const creado = await ordenNueva.save();
			console.log("creado--------------", creado);
			const ordenPlain = JSON.stringify(creado);
			enviarMail(ordenPlain, userEMail);
			return res.status(200).json({ Orden: "Orden generada" });
		}
		return res.status(400).json({ mensaje: "No se pudo crear la orden" });
	} catch (error) {}
	return res.status(400).json({ mensaje: "No se pudo crear la orden" });
};


function searchPriceBD(productosBD, IdItemCarrito) {
	let indexProdBD = 0;
	indexProdBD = productosBD.findIndex((prod) => {
		return prod._id == IdItemCarrito;
	});

	if (indexProdBD != -1) {
		let precioBD = productosBD[indexProdBD].precio;
		return precioBD;
	}
	return;
}
function newArrayItensCart(itensDelCarritoCopy, newArrayDeIds) {
	//Voy a recorrer todo el array de itens del carrito que están en el NewArrayDeIds
	for (let index = 0; index < newArrayDeIds.length; index++) {
		let IdItemCarrito = newArrayDeIds[index].toString();
		//Mismo indice del array de itens del carrito:
		let price = searchPriceBD(productosBD, IdItemCarrito);
		itensDelCarritoCopy[index].productPrice = price;
	}
	return itensDelCarritoCopy;
}