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
import { Icons } from "@unified/ui/components/icons";
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
const workspaces = [
	{
		name: "Teams",
		url: "/teams",
		icon: <Icons.Layers size={24} />,
		activeIcon: <Icons.LayersFill size={24} />,
		// PiUserSquareFill
	},
	{
		name: "Projects",
		url: "/projects",
		icon: <Icons.Grid size={24} />,
		activeIcon: <Icons.GridFill size={24} />,
		// IoGrid
	},
	{
		name: "Members",
		url: "/members",
		icon: <Icons.Users size={24} />,
		activeIcon: <Icons.UsersFill size={24} />,
		// HiUsers
	},
];
export function NavWorkspace() {
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
