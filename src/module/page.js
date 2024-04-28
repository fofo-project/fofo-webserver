import path from "path";
import { managerSessionMiddleware } from "./session";

const __dirname = path.resolve();

export function applyPage(app) {
	app.use(express.static(path.join(__dirname, "../../dist")));
	//page
	app.get("/page/manager/*", managerSessionMiddleware, (req, res) => {
		res.sendFile(path.join(__dirname, "../../dist/index.html"));
	});

	app.get("/page/user/*", (req, res) => {
		res.sendFile(path.join(__dirname, "../../dist/index.html"));
	});
}
