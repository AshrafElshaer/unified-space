import { auth } from "@/lib/auth/server";
import { Laptop } from "lucide-react";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

export default async function CalendarPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<div className="flex flex-col gap-4 flex-1 p-4">
			<h1 className="text-2xl font-bold">Calendar</h1>
			<div className="flex items-center gap-2 text-sm  text-black font-medium dark:text-white">
				{new UAParser(session?.session.userAgent || "").getDevice().type ===
				"mobile"
					? "Mobile"
					: "Desktop"}
				{new UAParser(session?.session.userAgent || "").getOS().name},{" "}
				{new UAParser(session?.session.userAgent || "").getBrowser().name}
			</div>
		</div>
	);
}
