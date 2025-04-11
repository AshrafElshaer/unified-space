"use client";
import { Button } from "@unified/ui/components/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@unified/ui/components/sheet";

export default function MessagesPage() {
	return (
		<div className="flex flex-col gap-4 flex-1 p-4">
			<h1 className="text-2xl font-bold">Messages</h1>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" className="w-fit">
						Open
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Messages</SheetTitle>
						<SheetDescription>
							Make changes to your profile here. Click save when you're done.
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	);
}
