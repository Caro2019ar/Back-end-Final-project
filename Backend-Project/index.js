import { http } from "./src/services/server.js";
import express from "express";
import config from "./src/services/config.js";
import { Server as Socket } from "socket.io";
import DbConnection from "./src/db/mongoDB.js";

const PORT = process.env.PORT || 8080;

DbConnection.Get().then(
	http.listen(PORT, async () => {
		console.log(
			`Servidor express escuchando en el puerto ${PORT}  - Entorno: ${config.NODE_ENV}`
		);
	})
);

