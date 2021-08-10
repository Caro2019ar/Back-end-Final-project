import mongoose from "mongoose";

const URL = process.env.MONGO_DB_URI;

const DbConnection = function () {
	let db = null;
	let instance = 0;

	async function DbConnect() {
		try {
			await mongoose.connect(URL, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
			});
			console.log("MongoDB conectada");
		} catch (err) {
			console.log(`MongoDB: Error en conectar: ${err}`);
			throw err;
		}
	}

	async function Get() {
		try {
			instance++; // this is just to count how many times our singleton is called.
			console.log(`DbConnection called ${instance} times`);

			if (db != null) {
				console.log(`db connection is already alive`);
				return db;
			} else {
				console.log(`getting new db connection`);
				db = await DbConnect();
				return db;
			}
		} catch (e) {
			return e;
		}
	}

	return {
		Get: Get,
	};
};

export default DbConnection();
