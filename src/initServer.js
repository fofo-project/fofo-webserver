import express from "express";
import { applyProxy } from "./module/proxy.js";
import { applySession } from "./module/session.js";
import { applyPage } from "./module/page.js";
import fs from "fs";
import https from "https";

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
	applySession(app);
	applyProxy(app, credentials);
	applyPage(app);
	app = https.createServer(credentials, app);
	return app;
}
