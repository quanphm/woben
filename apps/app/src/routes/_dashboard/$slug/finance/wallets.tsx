import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/$slug/finance/wallets")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_dashboard/$slug/finance/wallets"!</div>;
}
