import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "./config.js";
import path from "path";

const app = express();
const PORT = 3000;
const __dirname = path.resolve();
// Create proxy middleware
const proxyMiddleware = createProxyMiddleware({
	target: config.server_url,
	changeOrigin: true,
});

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// Use the proxy middleware
//app.use("/api", proxyMiddleware);

//
app.get("*", (req, res) => {
	res.sendFile(__dirname + "/dist/index.html");
});

// Start the server
app.listen(PORT, () => {
	console.log(`Proxy server is running on http://localhost:${PORT}`);
});
