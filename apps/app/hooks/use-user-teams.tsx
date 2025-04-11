"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserTeams } from "@unified/database/queries";
import { useSession } from "./use-session";

export function useUserTeams() {
	const { data: sessionData } = useSession();

	return useQuery({
		queryKey: ["user-teams"],
		queryFn: () => getUserTeams(sessionData?.user.id ?? ""),
	});
}
