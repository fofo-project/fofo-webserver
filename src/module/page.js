import path from "path";

const __dirname = path.resolve();

export function applyPage(app) {
	app.use(express.static(path.join(__dirname, "../../dist")));
	//page
	app.get("/page/*", (req, res) => {
		res.sendFile(path.join(__dirname, "/dist/index.html"));
	});
}
