import { eq } from "drizzle-orm";
import { db } from "../database";
import { member, workspace } from "../schema/auth.schema";

export async function getWorkspaceById(id: string) {
	return await db.query.workspace.findFirst({
		where: eq(workspace.id, id),
	});
}

export async function getUserWorkspace(userId: string) {
	const memberRecord = await db.query.member.findFirst({
		where: eq(member.userId, userId),
		with: {
			workspace: true,
		},
	});
	return memberRecord?.workspace;
}

export async function getWorkspaceMembers(workspaceId: string) {
	return await db.query.user.findMany({
		where: eq(member.workspaceId, workspaceId),
	});
}
