import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "./config.js";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 8080;
const __dirname = path.resolve();

// Create proxy middleware
const proxyMiddleware = createProxyMiddleware({
	target: config.server_url,
	changeOrigin: true,
	pathRewrite: {
		"^/api": "",
	},
});

// Update origin
app.use((req, res, next) => {
	req.headers.origin = config.server_url;
	console.log("Request Headers 1:", req.headers);
	next();
});

app.use(cors());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// Use the proxy middleware
app.use("/api", proxyMiddleware);

//
app.use(express.static(path.join(__dirname, "dist")));

// Start the server
app.listen(PORT, () => {
	console.log(`Proxy server is running on http://localhost:${PORT}`);
});
