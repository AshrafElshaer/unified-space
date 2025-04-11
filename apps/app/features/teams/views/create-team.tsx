"use client";

import { MemberSelector } from "@/components/selectors/member-selector";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTeamSchema } from "@unified/database/validations";
import { Button } from "@unified/ui/components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@unified/ui/components/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@unified/ui/components/form";
import { Input } from "@unified/ui/components/inputs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export function CreateTeam() {
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof insertTeamSchema>>({
		resolver: zodResolver(insertTeamSchema),
		defaultValues: {
			name: "",
		},
	});

	function onSubmit(data: z.infer<typeof insertTeamSchema>) {
		console.log(data);
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm" className="w-fit ml-auto">
					New Team
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Team</DialogTitle>
					<DialogDescription>
						Create a new team to start collaborating with your team members.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-8">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Team Leader</FormLabel>
										<FormControl>
											<MemberSelector
												value={field.value}
												onChange={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
				<DialogFooter className="flex-row">
					<DialogClose asChild>
						<Button size="sm" variant="outline" className="flex-1 ">
							Cancel
						</Button>
					</DialogClose>
					<Button size="sm" className="flex-1 ">
						Create Team
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
