import { createUser } from "@/services/api";
import { userKeys } from "@/services/query-key-factory";
import { usersQueryOptions } from "@/services/query-options";
import { getShapeStream } from "@electric-sql/react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useFormStatus } from "react-dom";

export const Route = createFileRoute("/")({
	loader: async ({ context }) => {
		const usersStream = getShapeStream({
			url: new URL("/v1/shape", import.meta.env.VITE_ELECTRIC_URL).href,
			params: {
				table: "user",
			},
		});
		await context.queryClient.ensureQueryData(usersQueryOptions());
	},
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const { data: users } = useSuspenseQuery(usersQueryOptions());

	async function formAction(formData: FormData) {
		const username = formData.get("username");
		const email = formData.get("email");

		if (!username || !email) {
			throw new Error("username or email can not be empty");
		}

		await createUser({
			data: {
				username: username.toString(),
				email: email.toString(),
			},
		});

		queryClient.invalidateQueries({ queryKey: userKeys.all });
	}

	return (
		<div>
			{users.map((u) => (
				<p key={u.id}>{u.username}</p>
			))}

			<form action={formAction}>
				<label htmlFor="username">username</label>
				<input id="username" name="username" autoComplete="off" />
				<label htmlFor="email">email</label>
				<input id="email" name="email" autoComplete="off" />
				<Submit />
			</form>
		</div>
	);
}

function Submit() {
	const { pending } = useFormStatus();
	return (
		<button type="submit" disabled={pending}>
			{pending ? "Submitting..." : "Submit"}
		</button>
	);
}
