"use client";

import {
	Folder,
	Forward,
	type LucideIcon,
	MoreHorizontal,
	Trash2,
} from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@unified/ui/components/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@unified/ui/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function NavWorkspace({
	workspaces,
}: {
	workspaces: {
		name: string;
		url: string;
		icon: React.ReactNode;
		activeIcon: React.ReactNode;
	}[];
}) {
	const pathname = usePathname();
	const { isMobile, setOpenMobile } = useSidebar();

	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Workspace</SidebarGroupLabel>
			<SidebarMenu>
				{workspaces.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton
							asChild
							isActive={pathname === item.url}
							onClick={() => {
								if (isMobile) {
									setOpenMobile(false);
								}
							}}
						>
							<Link href={item.url}>
								{pathname === item.url ? item.activeIcon : item.icon}
								<span>{item.name}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
