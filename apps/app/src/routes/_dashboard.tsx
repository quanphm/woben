import { SidebarLeft } from "@/components/layout/sidebar-left";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@woben/ui/sidebar";

export const Route = createFileRoute("/_dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<SidebarLeft />
			<SidebarInset>
				<main className="flex-1 overflow-y-auto overflow-x-hidden bg-bunker-800 px-4 pb-4 dark:[color-scheme:dark]">
					{/* <header className="mx-auto max-w-7xl py-4">Title</header> */}
					<div className="mx-auto flex max-w-7xl py-4">
						<div className="mb-4 flex flex-col items-start justify-start">
							<Outlet />
						</div>
					</div>
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
