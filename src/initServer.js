import express from "express";
import { applySession } from "./module/session.js";
import { applyApi } from "./module/api.js";
import { applyPage } from "./module/page.js";
import https from "https";
import path from "path";
import config from "../../config.js";

const __dirname = path.resolve();

// Certificate 인증서 경로
export function initServer() {
	let app = express();

	app.get("", (req, res, next) => {
		res.redirect("/page/WelcomeTo123");
	});

	app.use(express.static(path.join(__dirname, "dist")));
	applySession(app);
	applyApi(app, config.credentials);
	applyPage(app, express);
	app = https.createServer(config.credentials, app);
	return app;
}
