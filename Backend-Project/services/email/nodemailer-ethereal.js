import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: process.env.NODEMAILER_EMAIL,
		pass: process.env.NODEMAILER_PASSWORD,
	},
});

export const enviarMail = async (orden, userEMail) => {
	const mailOptions = {
		from: "Servidor Node.js",
		to: userEMail,
		subject: "Orden fue completada",
		html: `<h2 style="color:teal">Tu orden fue aceptada!</h2><p> <h3>Orden:</h3><br/> ${orden}</p>`,
	};

	await transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log("err", err);
		} else {
			console.log("info", info);
			// console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		}
	});
};
