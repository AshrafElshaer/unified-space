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
import { NavUser } from "@/components/sidebar/nav-user";
import { NavWorkspace } from "@/components/sidebar/nav-workspace";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
import { Icons } from "@unified/ui/components/icons";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@unified/ui/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiMessageRounded, BiSolidMessageRounded } from "react-icons/bi";
import { HiOutlineUsers, HiUsers } from "react-icons/hi2";
import { IoGrid, IoGridOutline } from "react-icons/io5";
import { IoCalendarNumber, IoCalendarNumberOutline } from "react-icons/io5";
import { PiUserSquare, PiUserSquareFill } from "react-icons/pi";
import { CommandMenu } from "./cmdk";
// This is sample data.
const data = {
	user: {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Design System",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "Design System",
					url: "#",
				},
				{
					title: "Starred",
					url: "#",
				},
				{
					title: "Settings",
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
					title: "Genesis",
					url: "#",
				},
				{
					title: "Explorer",
					url: "#",
				},
				{
					title: "Quantum",
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
					title: "Introduction",
					url: "#",
				},
				{
					title: "Get Started",
					url: "#",
				},
				{
					title: "Tutorials",
					url: "#",
				},
				{
					title: "Changelog",
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
	const pathname = usePathname();
	return (
		<Sidebar collapsible="offcanvas" className="bg-background" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</SidebarHeader>
			<SidebarContent>
				
				<NavWorkspace workspaces={data.workspaces} />
				<NavTeams items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}
