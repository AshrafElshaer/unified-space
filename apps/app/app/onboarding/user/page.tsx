import { UserOnboarding } from "@/features/onboarding/views/user-onboarding";
import { headers } from "next/headers";

export default async function UserOnboardingPage() {
	const countryCode = (await headers()).get("x-vercel-ip-country") ?? "US";
	return (
		<div className="flex flex-col gap-4 justify-center items-center h-screen p-4">
			<UserOnboarding countryCode={countryCode} />
		</div>
	);
}
