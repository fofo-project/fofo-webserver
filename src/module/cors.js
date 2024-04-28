import path from "path";
const cors = require("cors");

const __dirname = path.resolve();

export function applyCors(app) {
	//page
	app.use(cors());

	app.options("*", (req, res) => {
		res.set("Access-Control-Allow-Origin", "*");
		res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
		res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
		res.status(200).send();
	});
}
