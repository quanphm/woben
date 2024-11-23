import { serverEnv } from "@/env";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool({
	connectionString: serverEnv.DATABASE_URL,
});

export const db = drizzle({ client: pool });