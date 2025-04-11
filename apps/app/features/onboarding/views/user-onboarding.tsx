"use client";
import { PhoneInput } from "@/components/phone-number-input";
import { TextGenerateEffect } from "@/components/text-generate-effect";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@unified/database/validations";
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
import { Input } from "@unified/ui/components/inputs";
import { AnimatePresence, motion } from "motion/react";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCountdown } from "usehooks-ts";
import type { z } from "zod";
import { updateUserAction } from "../onboarding.actions";

export function UserOnboarding({ countryCode }: { countryCode: string }) {
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
						className: "flex-grow grid place-content-center w-full  p-4",
					}}
				>
					<TextGenerateEffect
						words="First, let's gather basic information about you."
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
					className="w-full p-4 max-w-lg mx-auto"
				>
					<UserForm countryCode={countryCode} />
				</motion.div>
			)}
		</AnimatePresence>
	);
}

type UserFormProps = {
	countryCode: string;
};
export function UserForm({ countryCode }: UserFormProps) {
	const form = useForm<z.infer<typeof updateUserSchema>>({
		resolver: zodResolver(updateUserSchema),
		defaultValues: {
			name: "",
			phoneNumber: "",
		},
	});
	const { execute, isExecuting } = useAction(updateUserAction, {
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});
	function onSubmit(data: z.infer<typeof updateUserSchema>) {
		execute(data);
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 mx-auto w-full max-w-xs"
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input {...field} placeholder="John Doe" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<PhoneInput
									{...field}
									countryCallingCode={countryCode}
									international
									defaultCountry="US"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					size="sm"
					className="w-full"
					disabled={isExecuting}
				>
					{isExecuting ? (
						<Icons.Loader className="w-4 h-4 animate-spin" />
					) : null}
					Continue
				</Button>
			</form>
		</Form>
	);
}
