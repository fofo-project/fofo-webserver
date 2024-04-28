import { createProxyMiddleware } from "http-proxy-middleware";
import expressSession from "express-session";
import admin_config from "../../admin.js";
import express from "express";

export function applySession(app) {
	app.use(
		expressSession({
			secret: admin_config.SECRET,
			resave: true,
			saveUninitialized: true,
			cookie: {
				secure: true,
				maxAge: 60 * 60 * 1000,
			},
		})
	);

	const locked = new Set();

	// 로그인 페이지
	app.get("/login", (req, res, next) => {});

	// 로그인 시도
	app.post("/auth", express.json(), (req, res, next) => {
		const { ACCOUNT, PASSWORD } = admin_config;
		const { username, password } = req.body;
		if (locked.has(req.ip)) {
			res.json({ success: false, locked: true });
		} else if (username === ACCOUNT && password === PASSWORD) {
			req.session.isAdmin = true;
			res.json({ success: true });
		} else {
			req.session.failCount = (req.session.failCount || 0) + 1;
			if (req.session.failCount > 10) {
				locked.add(req.ip);
				setTimeout(() => {
					locked.delete(req.ip);
				}, 1000 * 60 * 5);
			}
			res.json({ success: false, locked: false });
		}
	});
}

export function managerSessionMiddleware(req, res, next) {
	if (req.session.isAdmin !== true) {
		res.redirect("/login");
	} else {
		next();
	}
}
