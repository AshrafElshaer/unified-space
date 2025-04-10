"use client";

import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	GalleryVerticalEnd,
	SquareTerminal,
} from "lucide-react";
import type * as React from "react";

import { NavTeams } from "@/components/sidebar/nav-teams";

import { NavWorkspace } from "@/components/sidebar/nav-workspace";
import { WorkspaceDropdown } from "@/components/sidebar/workspace-dropdown";
import { Icons } from "@unified/ui/components/icons";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from "@unified/ui/components/sidebar";
import { NavCore } from "./nav-core";
// This is sample data.
const data = {
	teams: [
		{
			title: "Design System",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "Issues",
					url: "#",
				},
				{
					title: "Projects",
					url: "#",
				},
			],
		},
		{
			title: "Web Development",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Issues",
					url: "#",
				},
				{
					title: "Projects",
					url: "#",
				},
			],
		},
		{
			title: "AI Research",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Issues",
					url: "#",
				},
				{
					title: "Projects",
					url: "#",
				},
			],
		},
	],
	workspaces: [
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
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" className="bg-background" {...props}>
			<SidebarHeader>
				<WorkspaceDropdown />
			</SidebarHeader>
			<SidebarContent>
				<NavCore />
				<NavWorkspace workspaces={data.workspaces} />
				<NavTeams items={data.teams} />
			</SidebarContent>
		</Sidebar>
	);
}
