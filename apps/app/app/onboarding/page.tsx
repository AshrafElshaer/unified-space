"use client";

import { TextGenerateEffect } from "@/components/text-generate-effect";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingPage() {
	const router = useRouter();
	useEffect(() => {
		setTimeout(() => {
			router.push("/onboarding/user");
		}, 4500);
	}, [router]);
	return (
		<div className="min-h-[100svh] flex  items-center justify-center py-8 px-4 w-full max-w-2xl mx-auto">
			<TextGenerateEffect
				words="Welcome to Unified Space! We're thrilled to have you onboard. Next, we need more information to set you up for success."
				className="w-full "
			/>
		</div>
	);
}
