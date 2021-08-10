import ProductosDAODB from "../db/productosDaoDB.js";
import { productoSinId } from "../dto/productoDTO.js";
class Productos {
	constructor() {
		this.productosDAODB = new ProductosDAODB();
	}
	encontrarCategoria = async (categoria) => {
		const productos = await this.productosDAODB.encontrarCategoria(categoria);
		return productos;
	};

	listarAll = async () => {
		const productos = await this.productosDAODB.getAll();
		return productos;
	};

	listar = async (id) => {
		const productos = await this.productosDAODB.leer(id);
		return productos;
	};
	buscarDTO = async (id) => {
		const prod = await this.productosDAODB.leer(id);
		return productoSinId(prod);
	};

	guardar = async (prod) => {
		const producto = await this.productosDAODB.guardar(prod);
		return producto;
	};

	actualizar = async (prod, id) => {
		return await this.productosDAODB.actualizar(prod, id);
	};

	borrar = async (id) => {
		return await this.productosDAODB.borrar(id);
	};
}

export default Productos;
