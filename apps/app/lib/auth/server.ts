import { env } from "@/env";
import { resend } from "@/lib/resend";
import { stripe } from "@better-auth/stripe";
import { db } from "@unified/database";
import { getSessionById, getUserWorkspace } from "@unified/database/queries";
import * as schema from "@unified/database/schema";
import { OtpEmail } from "@unified/email/otp-email";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import {
	customSession,
	emailOTP,
	multiSession,
	organization,
	phoneNumber,
} from "better-auth/plugins";
import type { AuthortizeResponse } from "better-auth/plugins/access";
import Stripe from "stripe";
const stripeClient = new Stripe(env.STRIPE_SECRET_KEY);

export const auth = betterAuth({
	secret: env.BETTER_AUTH_SECRET,
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	appName: "Unified Space",
	advanced: {
		generateId: () => crypto.randomUUID(),
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
		cookieCache: {
			enabled: true,
			maxAge: 60 * 60 * 24, // Cache duration in seconds
		},
	},
	plugins: [
		customSession(async ({ user, session }) => {
			const sessionData = await getSessionById(session.id);
			const workspace = await getUserWorkspace(user.id);
			return {
				session: {
					...session,
					userAgent: sessionData?.userAgent,
					workspaceId: workspace?.id,
				},
				user,
			};
		}),
		stripe({
			stripeClient,
			stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
			createCustomerOnSignUp: true,
			subscription: {
				enabled: true,
				plans: [
					{
						name: "Basic",
						freeTrial: {
							days: 30,
						},
					},
				],
			},
			async onCustomerCreate(data, request) {},
			async onEvent(event) {},
		}),
		emailOTP({
			async sendVerificationOTP({ email, otp, type }) {
				// Implement the sendVerificationOTP method to send the OTP to the user's email address
				await resend.emails.send({
					from: "Unified Space <access@staffoptima.co>",
					to: email,
					subject: "Unified Space OTP Access",
					react: OtpEmail({ otpCode: otp }),
					headers: {
						"X-Entity-Ref-ID": email,
					},
				});
			},
			expiresIn: 10 * 60, // 10 minutes,
			otpLength: 6,
		}),
		multiSession(),
		nextCookies(),
		phoneNumber({
			sendOTP: ({ phoneNumber, code }, request) => {
				// Implement sending OTP code via SMS
			},
		}),
	],
	databaseHooks: {
		user: {
			create: {
				async after(user, context) {
					// TODO:SEND WELCOME EMAIL
				},
			},
		},
	},
});
