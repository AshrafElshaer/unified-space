"use server";

import { eq } from "drizzle-orm";
import type { z } from "zod";
import { db } from "../database";
import * as schema from "../schema";
import type {
	insertTeamMemberSchema,
	insertTeamSchema,
	updateTeamMemberSchema,
	updateTeamSchema,
} from "../validations";

type InsertTeam = z.infer<typeof insertTeamSchema>;
type UpdateTeam = z.infer<typeof updateTeamSchema>;
type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
type UpdateTeamMember = z.infer<typeof updateTeamMemberSchema>;

export async function createTeam(data: InsertTeam) {
	const [team] = await db.insert(schema.team).values(data).returning();
	return team;
}

export async function updateTeam(id: string, data: UpdateTeam) {
	const [team] = await db
		.update(schema.team)
		.set(data)
		.where(eq(schema.team.id, id))
		.returning();
	return team;
}

export async function deleteTeam(id: string) {
	await db.delete(schema.team).where(eq(schema.team.id, id));
}

export async function createTeamMember(data: InsertTeamMember) {
	const [teamMember] = await db
		.insert(schema.teamMember)
		.values(data)
		.returning();
	return teamMember;
}

export async function updateTeamMember(id: string, data: UpdateTeamMember) {
	const [teamMember] = await db
		.update(schema.teamMember)
		.set(data)
		.where(eq(schema.teamMember.id, id))
		.returning();
	return teamMember;
}

export async function deleteTeamMember(id: string) {
	await db.delete(schema.teamMember).where(eq(schema.teamMember.id, id));
}
