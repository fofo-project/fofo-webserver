import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "./config.js";
import cors from "cors";
import path from "path";
import https from "https";
import fs from "fs";

// Certificate 인증서 경로
const privateKey = fs.readFileSync(
	"/etc/letsencrypt/live/fofo.world/privkey.pem",
	"utf8"
);
const certificate = fs.readFileSync(
	"/etc/letsencrypt/live/fofo.world/cert.pem",
	"utf8"
);
const ca = fs.readFileSync(
	"/etc/letsencrypt/live/fofo.world/chain.pem",
	"utf8"
);

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca,
};

const app = express();
const HTTPS_PORT = 443;
const __dirname = path.resolve();

// Create proxy middleware
const proxyMiddleware = createProxyMiddleware({
	target: config.server_url,
	changeOrigin: true,
	pathRewrite: {
		"^/api": "",
	},
});

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// Define the catch-all route for /page/*
app.get("/page/*", (req, res) => {
	res.sendFile(path.join(__dirname, "/dist/index.html"));
});

// Use the proxy middleware
app.use(
	"/api",
	cors(),
	(req, res, next) => {
		req.headers.origin = config.server_url;
		next();
	},
	proxyMiddleware
);

const httpsServer = https.createServer(credentials, app);

// Start the server
httpsServer.listen(HTTPS_PORT, () => {
	console.log(`Proxy server is running on https://localhost:${HTTPS_PORT}`);
});
