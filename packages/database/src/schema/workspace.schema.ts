import { relations, sql } from "drizzle-orm";
import {
	boolean,
	index,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { unique } from "drizzle-orm/pg-core";
import { jsonb } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const workspace = pgTable("workspace", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	name: text("name").notNull(),
	metadata: text("metadata"),
	ownerId: uuid("owner_id")
		.references(() => user.id)
		.notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).default(
		sql`now()`,
	),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.default(sql`now()`)
		.$onUpdate(() => sql`now()`),
});

export const workspaceMemberRole = pgEnum("workspace_member_role", [
	"owner",
	"admin",
	"team_lead",
	"member",
]);

export const teamMemberRole = pgEnum("team_member_role", [
	"team_lead",
	"member",
]);

export const workspaceMember = pgTable(
	"workspace_member",
	{
		id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
		workspaceId: uuid("workspace_id")
			.notNull()
			.references(() => workspace.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		role: workspaceMemberRole("role").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.default(sql`now()`)
			.$onUpdate(() => sql`now()`),
	},
	(table) => [
		index("workspace_member_workspace_id_user_id_idx").on(
			table.workspaceId,
			table.userId,
		),
		unique("workspace_member_unique").on(table.workspaceId, table.userId),
	],
);

export const team = pgTable("team", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	name: text("name").notNull(),
	workspaceId: uuid("workspace_id")
		.notNull()
		.references(() => workspace.id, { onDelete: "cascade" }),
	leaderId: uuid("leader_id")
		.references(() => user.id)
		.notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.default(sql`now()`)
		.$onUpdate(() => sql`now()`),
});

export const teamMember = pgTable(
	"team_member",
	{
		id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
		teamId: uuid("team_id")
			.notNull()
			.references(() => team.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),

		role: teamMemberRole("role").notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.notNull()
			.default(sql`now()`),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.default(sql`now()`)
			.$onUpdate(() => sql`now()`),
	},
	(table) => [
		index("team_member_team_id_user_id_idx").on(table.teamId, table.userId),
	],
);

export const workspaceRelations = relations(workspace, ({ many }) => ({
	members: many(workspaceMember),
	teams: many(team),
}));

export const workspaceMemberRelations = relations(
	workspaceMember,
	({ one }) => ({
		workspace: one(workspace, {
			fields: [workspaceMember.workspaceId],
			references: [workspace.id],
		}),
		user: one(user, {
			fields: [workspaceMember.userId],
			references: [user.id],
		}),
	}),
);

export const teamRelations = relations(team, ({ many, one }) => ({
	members: many(teamMember),
	workspace: one(workspace, {
		fields: [team.workspaceId],
		references: [workspace.id],
	}),
}));

export const teamMemberRelations = relations(teamMember, ({ one }) => ({
	team: one(team, { fields: [teamMember.teamId], references: [team.id] }),
}));
