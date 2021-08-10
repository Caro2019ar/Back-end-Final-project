import mongoose from "mongoose";

// -------------------------------------------------------------
//                         SCHEMA
// -------------------------------------------------------------

const productoSchema = mongoose.Schema({
	nombre: { type: String, required: true },
	descripcion: { type: String, required: true },
	categoria: { type: String, required: true },
	precio: { type: Number, required: true },
	stockDisponible: { type: Number, required: true },
	fotos: {
		type: Array,
		required: false,
	},
});

const mensajeSchema = mongoose.Schema({
	userId: { type: String },
	tipo: { type: String },
	mensaje: { type: String },
});

const carritoSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
				productQty: {
					type: Number,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

const ordenSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
				productQty: {
					type: Number,
				},
				productPrice: {
					type: Number,
				},
			},
		],
		estado: { type: String, default: "Generada" },
		total: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	}
);
export const CarritoModel = mongoose.model("Cart", carritoSchema);

export const OrdenModel = mongoose.model("Order", ordenSchema);

export const ProductoModel = mongoose.model("Product", productoSchema);

export const MensajeModel = mongoose.model("Message", mensajeSchema);
