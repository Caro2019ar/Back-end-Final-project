import Productos from "../api/productos.js";
import UserModel from "../models/user.js";
import { ProductoModel } from "../models/model.js";
import { isAdminFunc } from "../middleware/auth.js";
let productos = await new Productos();

export const getProducts = async (req, res) => {
	let { categoria } = req.query;
	if (categoria) {
		categoria = categoria.trim().toLowerCase();
		const resultadoCategory = await productos.encontrarCategoria(categoria);
		res.json(resultadoCategory);
	} else {
		const productosListados = await productos.listarAll();
		res.json(productosListados);
	}
};

export const getProductPorId = async (req, res) => {
	const { id } = req.params;
	try {
		const productoPorId = await productos.buscarDTO(id);
		res.status(200).json(productoPorId);
	} catch (error) {
		res.status(400).send({ message: "No se pudo encontrar el producto" });
	}
};
export const postProducts = async (req, res) => {
	const producto = req.body;
	try {
		const retorno = await productos.guardar(producto);
		res.status(201).json(retorno);
	} catch (err) {
		res.status(500).send({ message: "No se pudo guardar" });
	}
};
export const patchProductId = async (req, res) => {
	const { id } = req.params;
	const prodObjt = {
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		precio: req.body.precio,
		fotos: req.body.fotos,
		categoria: req.body.categoria,
		stockDisponible: req.body.stockDisponible,
	};
	try {
		const updateProduct = await productos.actualizar(prodObjt, id);
		if (updateProduct) {
			res.send({ message: "Product Updated", product: updateProduct });
		} else {
			res.status(500).send({ message: "Error in updaing product" });
		}
	} catch (err) {
		res.status(404).send({ message: "Product Not Found" });
	}
};

export const deleteProductId = async (req, res) => {
	const { id } = req.params;
	try {
		const product = await productos.listar(id);
		if (product) {
			const deletedProduct = await productos.borrar(id);
			res.status(200).json({ message: "Producto borrado" });
		}
	} catch (err) {
		res.status(404).send("Producto no encontrado");
	}
};
