import { cors } from "hono/cors";
import type { HonoApp, Session, User } from "../types";
import { auth } from "./auth";

export function configureAuth(app: HonoApp) {
	app.use(
		"/auth/*",
		cors({
			origin: process.env.PUBLIC_APP_BASE_URL,
			allowHeaders: ["Content-Type", "Authorization"],
			allowMethods: ["POST", "GET", "OPTIONS"],
			exposeHeaders: ["Content-Length"],
			maxAge: 600,
			credentials: true,
		}),
	);

	app.use("*", async (c, next) => {
		// @ts-ignore
		const session = await auth.api.getSession({ headers: c.req.raw.headers });
		c.set("user", (session?.user as unknown as User) || null);
		c.set("session", (session?.session as unknown as Session) || null);
		await next();
	});

	app.all("/auth/*", (c) => {
		return auth.handler(c.req.raw);
	});
}
