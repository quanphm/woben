import { ExternalLinkIcon } from "@hoalu/icons/lucide";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@hoalu/ui/sidebar";

export function NavDocumentation() {
	return (
		<SidebarGroup id="nav-documentation">
			<SidebarGroupLabel>Documentation</SidebarGroupLabel>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton asChild tooltip="Settings">
						<a href={`${import.meta.env.PUBLIC_API_URL}/docs`} target="_blank" rel="noreferrer">
							<ExternalLinkIcon />
							<span>Docs</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild tooltip="Settings">
						<a
							href={`${import.meta.env.PUBLIC_API_URL}/reference`}
							target="_blank"
							rel="noreferrer"
						>
							<ExternalLinkIcon />
							<span>API reference</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton asChild tooltip="Settings">
						<a
							href={`${import.meta.env.PUBLIC_API_URL}/changelog`}
							target="_blank"
							rel="noreferrer"
						>
							<ExternalLinkIcon />
							<span>Changelog</span>
						</a>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
