import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "../../config.js";

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
		(req, res, next) => {
			req.headers.origin = config.server_url;
			next();
		},
		proxyMiddleware
	);
}
