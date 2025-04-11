"use server";

import { authActionClient } from "@/lib/safe-action";
import { createTeam, createTeamMember } from "@unified/database/mutations";
import { insertTeamSchema } from "@unified/database/validations";
import { revalidatePath } from "next/cache";

export const createTeamAction = authActionClient
	.metadata({
		name: "create-team",
	})
	.schema(insertTeamSchema.omit({ workspaceId: true }))
	.action(async ({ parsedInput, ctx }) => {
		const { workspace, session } = ctx;

		console.log(session.user.id, parsedInput.leaderId);

		const team = await createTeam({
			...parsedInput,
			workspaceId: workspace?.id ?? "",
		});

		if (!team) {
			throw new Error("Failed to create team");
		}

		await createTeamMember({
			teamId: team.id,
			userId: team.leaderId,
			role: "team_lead",
		});

		revalidatePath("/teams");

		return team;
	});
