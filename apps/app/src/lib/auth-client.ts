import { workspaceClient } from "@hoalu/auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: `${import.meta.env.PUBLIC_API_URL}/auth`,
	plugins: [workspaceClient()],
});

export type AuthClient = typeof authClient;
