"use server";

import { eq } from "drizzle-orm";
import { db } from "../database";

import { workspace, workspaceMember } from "../schema";

export async function getWorkspaceById(id: string) {
	return await db.query.workspace.findFirst({
		where: eq(workspace.id, id),
	});
}

export async function getUserWorkspace(userId: string) {
	const memberRecord = await db.query.workspaceMember.findFirst({
		where: eq(workspaceMember.userId, userId),
		with: {
			workspace: true,
		},
	});
	return memberRecord?.workspace;
}

export async function getWorkspaceMembers(workspaceId: string) {
	return await db.query.workspaceMember.findMany({
		where: eq(workspaceMember.workspaceId, workspaceId),
		with: {
			user: true,
		},
	});
}
