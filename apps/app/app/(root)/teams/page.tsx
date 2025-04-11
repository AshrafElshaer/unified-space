import { CreateTeam } from "@/features/teams/views/create-team";
import { TeamsList } from "@/features/teams/views/teams-list";
import { auth } from "@/lib/auth/server";
import { getTeamsWithMembers } from "@unified/database/queries";
import { Badge } from "@unified/ui/components/badge";
import { Separator } from "@unified/ui/components/separator";
import { headers } from "next/headers";
export default async function TeamsPage() {
	const headersList = await headers();
	const workspaceId = headersList.get("x-workspace-id");

	const teams = await getTeamsWithMembers(workspaceId ?? "");
	// console.dir(teams, { depth: Number.POSITIVE_INFINITY });
	return (
		<div className="flex flex-col flex-1 ">
			<section className="flex justify-between items-center  gap-4 px-4 py-2">
				<div className="font-bold flex items-center gap-2">
					<span>Teams</span>
					<Badge variant="secondary" className="text-sm rounded-full">
						{teams.length}
					</Badge>
				</div>

				<CreateTeam />
			</section>
			<Separator />
			<TeamsList teams={teams} />
		</div>
	);
}
