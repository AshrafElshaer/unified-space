import { isValidPhoneNumber } from "libphonenumber-js";

import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";
import * as schema from "./schema";
export const selectUserSchema = createSelectSchema(schema.user);
export const insertUserSchema = createInsertSchema(schema.user, {
	name: z.string().min(1, { message: "Name is required" }),
	phoneNumber: z.string().refine(isValidPhoneNumber, {
		message: "Invalid phone number",
	}),
}).omit({
	createdAt: true,
});

export const updateUserSchema = createUpdateSchema(schema.user, {
	name: z.string().min(1, { message: "Name is required" }),
	phoneNumber: z.string().refine(isValidPhoneNumber, {
		message: "Invalid phone number",
	}),
});

export const insertWorkspaceSchema = createInsertSchema(schema.workspace, {
	name: z.string().min(1, { message: "Name is required" }),
}).omit({
	createdAt: true,
});
export const selectWorkspaceSchema = createSelectSchema(schema.workspace);
export const updateWorkspaceSchema = createUpdateSchema(schema.workspace);

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
export const updateWorkspaceMemberSchema = createUpdateSchema(
	schema.workspaceMember,
);

export const insertTeamSchema = createInsertSchema(schema.team, {
	name: z.string().min(1, { message: "Name is required" }),
}).omit({
	createdAt: true,
});

export const selectTeamSchema = createSelectSchema(schema.team);
export const updateTeamSchema = createUpdateSchema(schema.team);

export const insertTeamMemberSchema = createInsertSchema(schema.teamMember, {
	role: z.enum(schema.teamMemberRole.enumValues),
}).omit({
	createdAt: true,
});

export const selectTeamMemberSchema = createSelectSchema(schema.teamMember);
export const updateTeamMemberSchema = createUpdateSchema(schema.teamMember);
