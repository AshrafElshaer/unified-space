import { Icons } from "@unified/ui/components/icons";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@unified/ui/components/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CommandMenu } from "./cmdk";

export function NavCore() {
	const pathname = usePathname();
	const { isMobile, setOpenMobile } = useSidebar();

	return (
		<SidebarGroup>
			<SidebarMenu>
				<CommandMenu />
				<SidebarMenuItem className="mt-2">
					<SidebarMenuButton
						asChild
						isActive={pathname === "/"}
						onClick={() => {
							if (isMobile) {
								setOpenMobile(false);
							}
						}}
					>
						<Link href={"/"}>
							{pathname === "/" ? <Icons.HomeFill /> : <Icons.Home />}
							<span>Dashboard</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton
						asChild
						isActive={pathname === "/calendar"}
						onClick={() => {
							if (isMobile) {
								setOpenMobile(false);
							}
						}}
					>
						<Link href={"/calendar"}>
							{pathname === "/calendar" ? (
								<Icons.CalendarFill />
							) : (
								<Icons.Calendar />
							)}

							<span>Calendar</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
				<SidebarMenuItem>
					<SidebarMenuButton
						asChild
						isActive={pathname === "/messages"}
						onClick={() => {
							if (isMobile) {
								setOpenMobile(false);
							}
						}}
					>
						<Link href={"/messages"}>
							{pathname === "/messages" ? (
								<Icons.MessagesFill />
							) : (
								<Icons.Messages />
							)}
							<span>Messages</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
