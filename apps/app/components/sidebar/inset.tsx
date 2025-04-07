"use client";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@unified/ui/components/breadcrumb";

import { Separator } from "@unified/ui/components/separator";
import {
	SidebarInset,
	SidebarTrigger,
	useSidebar,
} from "@unified/ui/components/sidebar";
import { cn } from "@unified/ui/lib/utils";

export function Inset({ children }: { children: React.ReactNode }) {
	const { state } = useSidebar();
	return (
		<SidebarInset
			className={cn(
				"border rounded-lg my-2 mr-2 ml-2 md:ml-0",
				state === "collapsed" && "md:ml-2",
			)}
		>
			<header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-4"
					/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">
									Building Your Application
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Data Fetching</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
			{children}
		</SidebarInset>
	);
}
