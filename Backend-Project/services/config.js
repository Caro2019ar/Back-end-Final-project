import dotenv from "dotenv";
import path from "path";
const __dir = path.resolve();

dotenv.config({
	path: path.join(__dir, `${process.env.NODE_ENV}.env`),
});

const entorno = {
	NODE_ENV: process.env.NODE_ENV || "development",
	MONGO_DB_URI: process.env.MONGO_DB_URI || "URI",
	TOKEN_KEEP_ALIVE: process.env.TOKEN_KEEP_ALIVE,
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
export default entorno;
