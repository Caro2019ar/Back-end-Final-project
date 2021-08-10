export const productoSinId = (producto) => {
	return {
		nombre: producto.nombre,
		descripcion: producto.descripcion,
		categoria: producto.categoria,
		precio: producto.precio,
		stockDisponible: producto.stockDisponible,
		fotos: producto.fotos,
	};
};

// export default productoSinId;
