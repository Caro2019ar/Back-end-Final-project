import mongoose from "mongoose";
import bcrypt from "bcrypt";

//TODO tenho dúvida só do Password se precisa ter 2 no Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	nombre: {
		type: String,
		required: true,
	},
	telefono: { type: String, required: true },
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	passwordRepeat: {
		type: String,
		required: true,
	},
	isAdmin: { type: Boolean, default: false },
	direccion: {
		calle: { type: String, required: true },
		altura: { type: String, required: true },
		codigoPostal: { type: String, required: true },
		piso: { type: String, required: false },
		departamento: { type: String, required: false },
	},
});

UserSchema.pre("save", async function (next) {
	const user = this;
	const hash = await bcrypt.hash(user.password, 10);
	this.password = hash;
	const hash2 = await bcrypt.hash(user.passwordRepeat, 10);
	this.passwordRepeat = hash2;

	next();
});

UserSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.password);
	return compare;
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
