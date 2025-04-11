"use server";

import { eq } from "drizzle-orm";
import { db } from "../database";
import * as schema from "../schema";

export async function getWorkspaceTeams(workspaceId: string) {
	const teams = await db.query.team.findMany({
		where: eq(schema.team.workspaceId, workspaceId),
	});
	return teams;
}

export async function getTeamsWithMembers(workspaceId: string) {
	const teams = await db.query.team.findMany({
		where: eq(schema.team.workspaceId, workspaceId),
		with: {
			members: {
				with: {
					user: true,
				},
			},
		},
	});

	return teams;
}

export async function getTeamById(teamId: string) {
	const team = await db.query.team.findFirst({
		where: eq(schema.team.id, teamId),
	});
	return team;
}

export async function getTeamMembers(teamId: string) {
	const teamMembers = await db.query.teamMember.findMany({
		where: eq(schema.teamMember.teamId, teamId),
	});
	return teamMembers;
}
