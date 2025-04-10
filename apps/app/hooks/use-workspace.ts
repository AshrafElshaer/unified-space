"use client";
import { authClient } from "@/lib/auth/client";
import { useQuery } from "@tanstack/react-query";
import { getUserWorkspace } from "@unified/database/queries";

export function useWorkspace() {
	const { data: sessionData } = authClient.useSession();
	return useQuery({
		queryKey: ["workspace"],
		queryFn: () => {
			if (!sessionData?.session) return null;
			return getUserWorkspace(sessionData.session.userId);
		},
		enabled: !!sessionData?.session,
	});
}
