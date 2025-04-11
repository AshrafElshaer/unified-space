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
import { Icons } from "@unified/ui/components/icons";
import { Input } from "@unified/ui/components/inputs";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { createTeamAction } from "../teams.actions";
const formSchema = insertTeamSchema.omit({
	workspaceId: true,
});

export function CreateTeam() {
	const [open, setOpen] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			leaderId: "",
		},
	});

	const { execute, isExecuting } = useAction(createTeamAction, {
		onSuccess: () => {
			toast.success("Team created successfully");
			setOpen(false);
			form.reset();
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});

	function onSubmit(data: z.infer<typeof formSchema>) {
		execute(data);
	}
	console.log(form.formState.errors);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm" className="w-fit ml-auto">
					New Team
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>Create Team</DialogTitle>
					<DialogDescription>
						Create a new team to start collaborating with your team members.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>TeamName</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="leaderId"
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
						<DialogFooter className="flex-row">
							<DialogClose asChild>
								<Button
									size="sm"
									variant="outline"
									className="flex-1 "
									disabled={isExecuting}
								>
									Cancel
								</Button>
							</DialogClose>
							<Button size="sm" className="flex-1 " disabled={isExecuting}>
								{isExecuting ? (
									<Icons.Loader className="w-4 h-4 animate-spin" />
								) : null}
								Create Team
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
