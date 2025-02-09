import { HTTPStatus } from "@hoalu/common/http-status";
import { authGuard } from "@hoalu/furnace";
import { cors } from "hono/cors";
import { createHonoInstance } from "./create-app";

export function configureElectricSync() {
	const sync = createHonoInstance().basePath("/sync");

	sync
		.use(
			cors({
				origin: [process.env.PUBLIC_APP_BASE_URL],
				allowMethods: ["POST", "GET", "HEAD", "DELETE", "OPTIONS"],
				exposeHeaders: [
					"electric-handle",
					"electric-offset",
					"electric-schema",
					"electric-cursor",
					"electric-up-to-date",
					"content-length",
					"content-encoding",
				],
				credentials: true,
			}),
		)
		.use(authGuard())
		.get("/", async (c) => {
			const shapeUrl = new URL(`${process.env.SYNC_URL}/v1/shape`);

			const searchParams = new URL(c.req.url).searchParams;
			searchParams.forEach((value, key) => {
				shapeUrl.searchParams.set(key, value);
			});

			const electricResponse = await fetch(shapeUrl.toString());

			if (electricResponse.status > 204) {
				console.error("Error: ", electricResponse.status);
				return c.json(
					{
						ok: false,
					},
					HTTPStatus.codes.BAD_REQUEST,
				);
			}

			const electricHeaders = new Headers(electricResponse.headers);

			if (electricResponse.status === HTTPStatus.codes.NO_CONTENT) {
				electricHeaders.set("electric-up-to-date", "");
				return c.body(null, HTTPStatus.codes.NO_CONTENT, {
					...Object.fromEntries(electricResponse.headers),
				});
			}

			const data: any = await electricResponse.json();

			if (electricHeaders.get("content-encoding")) {
				electricHeaders.delete("content-encoding");
				electricHeaders.delete("content-length");
			}

			const isUpToDate = data.find((d: any) => d?.headers.control === "up-to-date");
			if (isUpToDate) {
				electricHeaders.set("electric-up-to-date", "");
			}

			return c.json(data, HTTPStatus.codes.OK, {
				...Object.fromEntries(electricHeaders),
			});
		});

	return sync;
}
