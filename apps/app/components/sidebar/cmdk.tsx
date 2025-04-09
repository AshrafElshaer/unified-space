"use client";

import {
	Calculator,
	Calendar,
	CreditCard,
	Settings,
	Smile,
	User,
} from "lucide-react";
import * as React from "react";

import { Button } from "@unified/ui/components/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@unified/ui/components/command";
import { LuArrowUpDown } from "react-icons/lu";

export function CommandMenu() {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<>
			<Button
				variant="secondary"
				className="w-full justify-between pr-1"
				size="sm"
				onClick={() => setOpen(true)}
			>
				<span className="text-xs text-muted-foreground">Quick Actions</span>
				<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1   px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<Calendar />
							<span>Calendar</span>
						</CommandItem>
						<CommandItem>
							<Smile />
							<span>Search Emoji</span>
						</CommandItem>
						<CommandItem>
							<Calculator />
							<span>Calculator</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>
							<User />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<CreditCard />
							<span>Billing</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Settings />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
				<CommandSeparator />
				<div className="px-4 py-2 flex items-center justify-between">
					<div className="flex items-center gap-1">
						<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1   px-1.5 font-mono text-sm font-medium text-muted-foreground opacity-100">
							ESC
						</kbd>
						<span className="text-sm">to close</span>
					</div>
					<div className="flex items-center gap-1">
						<LuArrowUpDown className="w-4 h-4 text-muted-foreground" />
						<span className="text-sm">to navigate</span>
					</div>
					<div className="flex items-center gap-1">
						<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1   px-1.5 font-mono text-sm font-medium text-muted-foreground opacity-100">
							Enter
						</kbd>
						<span className="text-sm">to select</span>
					</div>
				</div>
			</CommandDialog>
		</>
	);
}
