"use client";

import { authClient } from "@/lib/auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWorkspaceSchema } from "@unified/database/validations";
import { Button } from "@unified/ui/components/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@unified/ui/components/form";
import { Input, UrlInput } from "@unified/ui/components/inputs";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { createWorkspaceAction } from "../onboarding.actions";
export function CreateWorkspace() {
	const { execute, status, isExecuting } = useAction(createWorkspaceAction, {
		onSuccess: () => {
			toast.success("Workspace created successfully");
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});

	const form = useForm<z.infer<typeof insertWorkspaceSchema>>({
		resolver: zodResolver(insertWorkspaceSchema),
		defaultValues: {
			name: "",
		},
	});

	async function onSubmit(data: z.infer<typeof insertWorkspaceSchema>) {
		execute({
			name: data.name,
			metadata: data.metadata || "",
		});
	}

	return (
		<div className="flex flex-col p-4 justify-center items-center w-full h-screen gap-8">
			<h1 className="text-2xl font-bold">Create Your Workspace</h1>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 w-full max-w-sm "
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Workspace Name</FormLabel>
								<FormControl>
									<Input
										{...field}
										onChange={(e) => {
											field.onChange(e);
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" disabled={isExecuting} className="w-full">
						{isExecuting ? <Loader className="animate-spin" /> : null}
						<span>Continue</span>
					</Button>
				</form>
			</Form>
		</div>
	);
}
