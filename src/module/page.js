import path from "path";
import { managerSessionMiddleware } from "./session.js";

const __dirname = path.resolve();

export function applyPage(app, express) {
	app.use(express.static(path.join(__dirname, "../../dist")));
	//page
	app.get("/page", managerSessionMiddleware, (req, res) => {
		res.sendFile(path.join(__dirname, "../../dist/index.html"));
	});
}
