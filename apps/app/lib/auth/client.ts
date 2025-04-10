import { env } from "@/env";
import { stripeClient } from "@better-auth/stripe/client";

import { createAuthClient } from "better-auth/react";
import {
	customSessionClient,
	emailOTPClient,
	multiSessionClient,
	organizationClient,
	phoneNumberClient,
} from "better-auth/client/plugins";
import type { auth } from "./server";

//
export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
	plugins: [
		emailOTPClient(),
		organizationClient(),
		multiSessionClient(),
		phoneNumberClient(),
		stripeClient({
			subscription: true, //if you want to enable subscription management
		}),
		customSessionClient<typeof auth>(),
	],
});
