import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Inset } from "@/components/sidebar/inset";
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
	SidebarProvider,
	SidebarTrigger,
} from "@unified/ui/components/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar variant="floating" />
			<Inset>{children}</Inset>
		</SidebarProvider>
	);
}
