"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import { useUserTeams } from "@/hooks/use-user-teams";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@unified/ui/components/collapsible";
import { Icons } from "@unified/ui/components/icons";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@unified/ui/components/sidebar";
import Link from "next/link";

export function NavTeams() {
	const { data: userTeams } = useUserTeams();
	if (!userTeams) return null;
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Your Teams</SidebarGroupLabel>
			<SidebarMenu>
				{userTeams?.map((team, idx) => (
					<Collapsible
						key={team.team.id}
						asChild
						defaultOpen={idx === 0}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={team.team.name}>
									<span className="truncate">{team.team.name}</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub className="border-0 mx-2">
									<SidebarMenuSubItem>
										<SidebarMenuSubButton asChild>
											<Link href="#">
												<Icons.Copy className="size-2" />
												<span>Tasks</span>
											</Link>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
									<SidebarMenuSubItem>
										<SidebarMenuSubButton asChild>
											<Link href="#">
												<Icons.Package className="size-2" />
												<span>Projects</span>
											</Link>
										</SidebarMenuSubButton>
									</SidebarMenuSubItem>
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
				{/* {items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && <item.icon />}
									<span className="truncate">{item.title}</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub className="border-0 mx-2">
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton asChild>
												<a href={subItem.url}>
													{subItem.icon && subItem.icon}
													<span>{subItem.title}</span>
												</a>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))} */}
			</SidebarMenu>
		</SidebarGroup>
	);
}
