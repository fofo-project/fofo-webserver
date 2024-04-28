import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "../../config.js";
import cors from "cors";

export function applyApi(app, credentials) {
	// Create proxy middleware
	const proxyMiddleware = createProxyMiddleware({
		target: config.server_url,
		changeOrigin: true,
		ssl: credentials,
		pathRewrite: {
			"^/api": "",
		},
		secure: false,
	});

	app.use(
		"/api",
		cors(),
		(req, res, next) => {
			req.headers.origin = config.server_url;
			next();
		},
		proxyMiddleware
	);
}
