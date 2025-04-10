"use server";
import { auth } from "@/lib/auth/server";
import { actionClient } from "@/lib/safe-action";
import { updateSessionByToken } from "@unified/database/mutations";
import { getUserWorkspace } from "@unified/database/queries";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

export const signInAction = actionClient
	.schema(
		z.object({
			email: z.string().email(),
		}),
	)
	.action(async ({ parsedInput: { email } }) => {
		const { success } = await auth.api.sendVerificationOTP({
			body: {
				email,
				type: "sign-in",
			},
			headers: await headers(),
		});

		return { success, email };
	});

export const verifyOtpAction = actionClient
	.schema(
		z.object({
			email: z.string().email(),
			otp: z.string(),
		}),
	)
	.action(async ({ parsedInput: { email, otp } }) => {
		const headersList = await headers();
		const ipAddress = headersList.get("x-forwarded-for");
		const userAgent = headersList.get("user-agent");

		const { user, token } = await auth.api.signInEmailOTP({
			body: {
				email,
				otp,
			},
			headers: headersList,
		});

		await updateSessionByToken(token, {
			ipAddress,
			userAgent,
		});

		const workspace = await getUserWorkspace(user.id);

		return workspace;
	});

export const signOutAction = actionClient
	.schema(z.object({ redirect_url: z.string() }))
	.action(async ({ parsedInput: { redirect_url } }) => {
		await auth.api.signOut({
			headers: await headers(),
		});
		redirect(redirect_url);
	});
