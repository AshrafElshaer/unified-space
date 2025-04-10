"use server";
import type { z } from "zod";
import { db } from "../database";
import { workspace, workspaceMember } from "../schema";
import type {
	insertWorkspaceMemberSchema,
	insertWorkspaceSchema,
} from "../validations";
type InsertWorkspace = z.infer<typeof insertWorkspaceSchema>;
type InsertWorkspaceMember = z.infer<typeof insertWorkspaceMemberSchema>;

export async function createWorkspace(data: InsertWorkspace) {
	const [newWorkspace] = await db.insert(workspace).values(data).returning();
	return newWorkspace;
}

export async function createWorkspaceMember(data: InsertWorkspaceMember) {
	const [newWorkspaceMember] = await db
		.insert(workspaceMember)
		.values(data)
		.returning();
	return newWorkspaceMember;
}
