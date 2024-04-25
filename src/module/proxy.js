import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "../../config.js";
import cors from "cors";

export function applyProxy(app, credentials) {
	// Create proxy middleware
	const proxyMiddleware = createProxyMiddleware({
		target: config.server_url,
		changeOrigin: true,
		ssl: credentials,
		onProxyReq: function onProxyReq(proxyReq, req, res) {
			console.log(
				"-->  ",
				req.method,
				req.path,
				"->",
				proxyReq.baseUrl + proxyReq.path
			);
		},
		pathRewrite: {
			"^/api": "",
		},
		secure: false,
	});

	// Use the proxy middleware
	app.use(
		"/api",
		cors(),
		(req, res, next) => {
			req.headers.origin = config.server_url;
			next();
		},
		proxyMiddleware,
		(req, res, next) => {
			req.headers.origin = config.server_url;
			next();
		}
	);
}
