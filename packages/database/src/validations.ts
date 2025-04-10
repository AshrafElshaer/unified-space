import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import * as schema from "./schema";

export const insertWorkspaceSchema = createInsertSchema(schema.workspace, {
	name: z.string().min(1, { message: "Name is required" }),
}).omit({
	createdAt: true,
});
export const selectWorkspaceSchema = createSelectSchema(schema.workspace);
export const updateWorkspaceSchema = insertWorkspaceSchema.partial();

export const insertWorkspaceMemberSchema = createInsertSchema(
	schema.workspaceMember,
	{
		role: z.enum(schema.workspaceMemberRole.enumValues),
	},
).omit({
	createdAt: true,
});

export const selectWorkspaceMemberSchema = createSelectSchema(
	schema.workspaceMember,
);
export const updateWorkspaceMemberSchema =
	insertWorkspaceMemberSchema.partial();
