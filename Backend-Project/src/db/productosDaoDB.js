import CustomError from "../errores/CustomError.js";
import * as model from "../models/model.js";

class ProductosDaoDB {
	constructor() {}
	getAll = async () => {
		try {
			const buscados = await model.ProductoModel.find({}).lean();
			console.log("buscados", buscados);
			return buscados;
		} catch (err) {
			throw new CustomError(500, "Error al obtener todos los productos", err);
		}
	};
	encontrarCategoria = async (categoria) => {
		try {
			const buscados = await model.ProductoModel.find({ categoria: categoria });
			return buscados;
		} catch (error) {
			throw new CustomError(400, "Error al buscar", err);
		}
	};
	guardar = async (producto) => {
		try {
			const productoCreado = new model.ProductoModel(producto);
			const productoguardado = await productoCreado.save();
			console.log("productoCreado", productoCreado);
			return productoguardado;
		} catch (err) {
			throw new CustomError(400, "Error al guardar", err);
		}
	};
	actualizar = async (prodObjt, id) => {
		try {
			for (const [key, value] of Object.entries(prodObjt)) {
				if (!value) {
					delete prodObjt[key];
				}
			}
			const product = await model.ProductoModel.find({ _id: id });
			if (product) {
				const updatedProduct = await model.ProductoModel.findOneAndUpdate(
					{ _id: id },
					{ $set: { ...prodObjt } },
					{ new: true }
				);
				return updatedProduct;
			}
			else {
				throw new CustomError(400, "No se pudo encontrar el producto", err);
			}
		} catch (err) {
			throw new CustomError(400, "No se pudo actualizar", err);
		}
	};

	borrar = async (id) => {
		try {
			const apagar = await model.ProductoModel.deleteOne({ _id: id });
			return apagar;
		} catch (error) {
			throw new CustomError(400, "No se pudo borrar", err);
		}
	};
	leer = async (id) => {
		try {
			const buscado = await model.ProductoModel.findOne({ _id: id });
			return buscado;
		} catch (err) {
			throw new CustomError(400, "No se pudo buscar por ID", err);
		}
	};
}

export default ProductosDaoDB;
