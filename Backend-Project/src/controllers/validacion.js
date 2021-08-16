import UserModel from "../models/user.js";

const validationSignup = async (req, res, next) => {
	const { email } = req.user;
	const { nombre, telefono, isAdmin, direccion, password, passwordRepeat } =
		req.body;
	const calle = direccion.calle;
	const altura = direccion.altura;
	const codigoPostal = direccion.codigoPostal;

	switch (true) {
		case !validateName(nombre):
			return res.status(400).json({ message: "Campo de nombre invalido." });
			break;
		case !validatePhone(telefono):
			return res.status(400).send({ message: "Campo de telefono invalido." });
			break;
		case !validateEmail(email):
			return res.status(400).send({ message: "Email invalido." });
			break;
		case calle.length < 6 || altura.length < 5 || codigoPostal.length < 4:
			return res.status(400).send({ message: "Endereço invalido." });
			break;
		case password.length < 6:
			return res.status(400).send({
				message: "La contraseña debe tener por lo menos 6 caracteres",
			});
			break;
		case password != passwordRepeat:
			return res.status(400).send({ message: "Contraseñas no son iguales" });
			break;
		default:
			console.log("Validacion OK");
			next();
	}
};

const validatePhone = (phoneNumber) => {
	// let phoneNumber = "(11) 9992 0999";
	const phoneRGEX =
		/^[(]{0,1}[0-9]{2}[)]{0,1}[-\s\.]{0,1}[0-9]{4}[-\s\.]{0,1}[0-9]{4}$/;
	const phoneResult = phoneRGEX.test(phoneNumber);
	return phoneResult;
};

const validateEmail = (email) => {
	// let email = "dada*kk!'+-#$%so.dad@adasda.casda.dsasd";
	const emailRGEX =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const emailResult = emailRGEX.test(email);
	return emailResult;
};

// Aceita acentos, ç, ñ, apóstrofe, mas não números e caracteres especiais
const validateName = (name) => {
	// let name = "Robert's Dajoú's Yaça ñata Shön";
	const nameRGX = /^[a-záàâãéèêíïóôõöúçñ' ]+$/i;
	const nameResult = nameRGX.test(name);
	return nameResult;
};

export { validationSignup };

