import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";

const storage = new GridFsStorage({
	url: process.env.MONGO_DB_URI,
	options: { useNewUrlParser: true, useUnifiedTopology: true },
	file: (req, file) => {
		const match = ["image/png", "image/jpeg"];

		if (match.indexOf(file.mimetype) === -1) {
			const filename = `${file.originalname}`;
			return filename;
		}

		return {
			bucketName: "Images",
			filename: `${file.originalname}`,
		};
	},
});

export default multer({ storage });
