"use client";

import type * as React from "react";

import { NavTeams } from "@/components/sidebar/nav-teams";

import { NavWorkspace } from "@/components/sidebar/nav-workspace";
import { WorkspaceDropdown } from "@/components/sidebar/workspace-dropdown";

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from "@unified/ui/components/sidebar";
import { NavCore } from "./nav-core";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" className="bg-background" {...props}>
			<SidebarHeader>
				<WorkspaceDropdown />
			</SidebarHeader>
			<SidebarContent>
				<NavCore />
				<NavWorkspace />
				<NavTeams />
			</SidebarContent>
		</Sidebar>
	);
}
