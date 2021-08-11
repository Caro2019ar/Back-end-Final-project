const validationSignup = (req, res, next) => {
	const { email } = req.user;
	const { nombre, telefono, isAdmin, direccion, password, passwordRepeat } =
		req.body;
	const calle = direccion.calle;
	const altura = direccion.altura;
	const codigoPostal = direccion.codigoPostal;

	try {
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
			case calle.length < 6 || altura.length < 6 || codigoPostal.length < 4:
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
	} catch (error) {
		res.send({ message: "Error en la Validacion" });
	}
};

const validatePhone = (phoneNumber) => {
	const phoneRGEX =
		/^[(]{0,1}[0-9]{2}[)]{0,1}[-\s\.]{0,1}[0-9]{4}[-\s\.]{0,1}[0-9]{4}$/;
	const phoneResult = phoneRGEX.test(phoneNumber);
	return phoneResult;
};

const validateEmail = (email) => {
	const emailRGEX =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const emailResult = emailRGEX.test(email);
	return emailResult;
};

const validateName = (name) => {
	const nameRGX = /^[a-záàâãéèêíïóôõöúçñ' ]+$/i;
	const nameResult = nameRGX.test(name);
	return nameResult;
};

export { validateEmail, validateName, validatePhone, validationSignup };
