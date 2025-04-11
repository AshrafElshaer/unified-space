"use client";

import { TextGenerateEffect } from "@/components/text-generate-effect";
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
import { Icons } from "@unified/ui/components/icons";
import { Input, UrlInput } from "@unified/ui/components/inputs";
import { Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCountdown } from "usehooks-ts";
import type { z } from "zod";
import { createWorkspaceAction } from "../onboarding.actions";
export function WorkspaceOnboarding() {
	const [counter, { startCountdown }] = useCountdown({
		countStart: 3,
		intervalMs: 1000,
	});

	useEffect(() => {
		startCountdown();
	}, [startCountdown]);

	return (
		<AnimatePresence mode="wait">
			{counter !== 0 ? (
				<motion.div
					key={"welcome-message"}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.4 }}
					custom={{
						className: "flex-grow grid place-content-center w-full p-4",
					}}
				>
					<TextGenerateEffect
						words="Now, let's set up your workspace."
						className="w-full"
					/>
				</motion.div>
			) : (
				<motion.div
					key={"onboarding-form"}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.4 }}
					custom={{ className: "w-full p-4" }}
				>
					<CreateWorkspace />
				</motion.div>
			)}
		</AnimatePresence>
	);
}
const formSchema = insertWorkspaceSchema.omit({ ownerId: true });

export function CreateWorkspace() {
	const { execute, status, isExecuting } = useAction(createWorkspaceAction, {
		onSuccess: () => {
			toast.success("Workspace created successfully");
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
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
					className="flex flex-col gap-4 w-full max-w-sm "
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

					<Button
						type="submit"
						disabled={isExecuting}
						className="w-full"
						size="sm"
					>
						{isExecuting ? (
							<Icons.Loader className="w-4 h-4 animate-spin" />
						) : null}
						<span>Finish</span>
					</Button>
				</form>
			</Form>
		</div>
	);
}
