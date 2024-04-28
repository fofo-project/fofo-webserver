import express from "express";
import { applyApi } from "./module/api.js";
import { applySession } from "./module/session.js";
import { applyPage } from "./module/page.js";
import fs from "fs";
import https from "https";
import path from "path";

const __dirname = path.resolve();

// Certificate 인증서 경로
const credentials = {
	key: fs.readFileSync(
		"/etc/letsencrypt/live/fofo.world/privkey.pem",
		"utf8"
	),
	cert: fs.readFileSync("/etc/letsencrypt/live/fofo.world/cert.pem", "utf8"),
	ca: fs.readFileSync("/etc/letsencrypt/live/fofo.world/chain.pem", "utf8"),
};

export function initServer() {
	let app = express();

	app.get("", (req, res, next) => {
		res.redirect("/page/MemberForm");
	});

	app.use(express.static(path.join(__dirname, "dist")));
	applySession(app);
	applyApi(app, credentials);
	applyPage(app, express);
	app = https.createServer(credentials, app);
	return app;
}
