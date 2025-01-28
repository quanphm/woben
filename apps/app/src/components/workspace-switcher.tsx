import { CreateWorkspaceDialog } from "@/components/create-workspace-dialog";
import { WorkspaceAvatar } from "@/components/workspace-avatar";
import { listWorkspacesOptions } from "@/lib/query-options";
import { ChevronsUpDownIcon, ExternalLinkIcon, HomeIcon, PlusIcon } from "@hoalu/icons/lucide";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@hoalu/ui/dropdown-menu";
import { ScrollArea } from "@hoalu/ui/scroll-area";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@hoalu/ui/sidebar";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

interface Props {
	currentWorkspace: {
		name: string;
		logo?: string | null;
	};
}

export function WorkspaceSwitcher({ currentWorkspace }: Props) {
	const { data: workspaces } = useSuspenseQuery(listWorkspacesOptions());

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<WorkspaceAvatar logo={currentWorkspace?.logo} name={currentWorkspace.name} />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{currentWorkspace.name}</span>
							</div>
							<ChevronsUpDownIcon className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) rounded-lg"
						align="start"
						side="bottom"
						sideOffset={4}
					>
						<DropdownMenuItem className="gap-2 p-2" asChild>
							<Link to="/">
								<HomeIcon />
								<span>Home</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem className="gap-2 p-2" asChild>
							<a href="https://hoalu.app" target="_blank" rel="noreferrer">
								<ExternalLinkIcon />
								<span>
									Website <span className="text-muted-foreground text-xs">hoalu.app</span>
								</span>
							</a>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuLabel className="text-muted-foreground/60 text-xs">
							Workspaces
						</DropdownMenuLabel>
						<ScrollArea className="h-72">
							{workspaces.map((ws) => (
								<DropdownMenuItem key={ws.publicId} className="gap-2 p-2" asChild>
									<Link to="/$slug" params={{ slug: ws.slug }}>
										<WorkspaceAvatar logo={ws.logo} name={ws.name} size="sm" />
										{ws.name}
									</Link>
								</DropdownMenuItem>
							))}
						</ScrollArea>
						<DropdownMenuSeparator />
						<CreateWorkspaceDialog>
							<DropdownMenuItem className="gap-2 p-2">
								<div className="flex size-6 items-center justify-center rounded-md border bg-background">
									<PlusIcon className="size-4" />
								</div>
								<div className="font-medium text-muted-foreground">Create a workspace</div>
							</DropdownMenuItem>
						</CreateWorkspaceDialog>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
