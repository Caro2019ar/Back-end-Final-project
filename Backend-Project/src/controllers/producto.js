import Productos from "../api/productos.js";
import UserModel from "../models/user.js";
import { isAdminFunc } from "../middleware/auth.js";

let productos = await new Productos();

export const getProducts = async (req, res) => {
	const productosListados = await productos.listarAll();
	console.log(productosListados);
	res.json(productosListados);
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

export const getProductsCategory = async (req, res) => {
	let { category } = req.params;
	category = category.trim().toLowerCase();
	const resultadoCategory = await productos.encontrarCategoria(category);
	res.json(resultadoCategory);
};
// Aqui podia usar interface de Typescript para definir formato do produto

export const postProducts = async (req, res) => {
	const producto = req.body;
	try {
		const retorno = await productos.guardar(producto);
		res.status(201).json(retorno);
	} catch (err) {
		res.status(500).send({ message: "No se pudo guardar" });
	}
};

// não atualiza só 1 campo?
export const patchProductId = async (req, res) => {
	const { id } = req.params;

	const { nombre, descripcion, categoria, precio, stockDisponible, fotos } =
		req.body;
	const producto = {
		nombre,
		descripcion,
		categoria,
		precio,
		stockDisponible,
		fotos,
	};
	try {
		const prodActualizar = await productos.actualizar(producto, id);
		res.json(prodActualizar);
	} catch (err) {
		res.status(400).json({ message: "No se pudo actualizar" });
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
