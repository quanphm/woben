import { createUser } from "@/services/api";
import { userKeys } from "@/services/query-key-factory";
import { usersQueryOptions } from "@/services/query-options";
import { useShape } from "@electric-sql/react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@woben/ui/button";
import { Input } from "@woben/ui/input";
import { Label } from "@woben/ui/label";
import { useFormStatus } from "react-dom";

export const Route = createFileRoute("/")({
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(usersQueryOptions());
	},
	component: RouteComponent,
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const { data: users } = useSuspenseQuery(usersQueryOptions());
	const { data: shapeData } = useShape({
		url: new URL(import.meta.env.PUBLIC_SYNC_URL + "/v1/shape").href,
		params: {
			table: "user",
		},
	});

	console.log(shapeData);

	async function formAction(formData: FormData) {
		const username = formData.get("username");
		const email = formData.get("email");

		if (!username || !email) {
			throw new Error("username or email can not be empty");
		}

		await createUser({
			username: username.toString(),
			email: email.toString(),
		});

		queryClient.invalidateQueries({ queryKey: userKeys.all });
	}

	return (
		<div>
			{users.map((u) => (
				<p key={u.id}>{u.username}</p>
			))}

			<form action={formAction}>
				<Label htmlFor="username">username</Label>
				<Input id="username" name="username" autoComplete="off" />
				<Label htmlFor="email">email</Label>
				<Input id="email" name="email" autoComplete="off" />
				<Submit />
			</form>
		</div>
	);
}

function Submit() {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" disabled={pending}>
			{pending ? "Submitting..." : "Submit"}
		</Button>
	);
}
