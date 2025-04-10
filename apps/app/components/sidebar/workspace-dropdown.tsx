"use client";

import {
	ChevronsUpDown,
	Laptop,
	Loader,
	Moon,
	Settings,
	Sun,
	SunMoon,
} from "lucide-react";
import * as React from "react";

import { useWorkspace } from "@/hooks/use-workspace";
import { authClient } from "@/lib/auth/client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@unified/ui/components/dropdown-menu";
import { Icons } from "@unified/ui/components/icons";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@unified/ui/components/sidebar";
import { Skeleton } from "@unified/ui/components/skeleton";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

export function WorkspaceDropdown() {
	const [isSigningOut, startTransition] = React.useTransition();
	const { data: workspace, isLoading } = useWorkspace();
	const router = useRouter();
	const pathname = usePathname();
	const { setTheme } = useTheme();

	async function signOut() {
		startTransition(async () => {
			await authClient.signOut().then(() => {
				router.push(`/auth?redirect_url=${pathname}`);
			});
		});
	}

	if (isLoading) {
		return (
			<SidebarMenuButton
				disabled
				size="sm"
				className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
			>
				<Skeleton className="size-5 rounded-md" />
				<div className="grid flex-1 text-left text-sm leading-tight">
					<Skeleton className="h-5 w-24 rounded-md" />
				</div>
				<ChevronsUpDown className="ml-auto" />
			</SidebarMenuButton>
		);
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="sm"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-5 items-center justify-center rounded-md font-semibold">
								{workspace?.name ? workspace.name.slice(0, 2) : ""}
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{workspace?.name ?? ""}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width)  rounded-lg"
						align="start"
						side="bottom"
						sideOffset={4}
					>
						{/* <DropdownMenuLabel className="text-muted-foreground text-xs">
							Teams
						</DropdownMenuLabel> */}
						<DropdownMenuSub>
							<DropdownMenuSubTrigger className="gap-2 flex items-center">
								<SunMoon className="size-4" />
								Themes
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent sideOffset={8}>
								<DropdownMenuItem
									className="gap-2"
									onSelect={() => setTheme("light")}
								>
									<Sun className="size-4" />
									<span>Light</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									className="gap-2"
									onSelect={() => setTheme("dark")}
								>
									<Moon className="size-4" />
									<span>Dark</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									className="gap-2"
									onSelect={() => setTheme("system")}
								>
									<Laptop className="size-4" />
									<span>System</span>
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuSub>

						<DropdownMenuItem className="gap-2 text-foreground">
							<Settings className="size-4 shrink-0 text-foreground" />
							<span>Settings</span>
							{/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="gap-2 "
							disabled={isSigningOut}
							onSelect={(e) => {
								e.preventDefault();
								signOut();
							}}
						>
							{isSigningOut ? (
								<Loader className="size-4 animate-spin text-foreground" />
							) : (
								<Icons.Door className="size-4 text-foreground" />
							)}

							<span>Sign Out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
