import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
	stripeCustomerId: text("stripe_customer_id"),
	phoneNumber: text("phone_number").unique(),
	phoneNumberVerified: boolean("phone_number_verified"),
});

export const session = pgTable("session", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: uuid("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	activeWorkspaceId: uuid("active_workspace_id").references(() => workspace.id),
});

export const account = pgTable("account", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: uuid("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).notNull(),
});

export const verification = pgTable("verification", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const subscription = pgTable("subscription", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	plan: text("plan").notNull(),
	referenceId: text("reference_id").notNull(),
	stripeCustomerId: text("stripe_customer_id"),
	stripeSubscriptionId: text("stripe_subscription_id"),
	status: text("status"),
	periodStart: timestamp("period_start", { withTimezone: true }),
	periodEnd: timestamp("period_end", { withTimezone: true }),
	cancelAtPeriodEnd: boolean("cancel_at_period_end"),
	seats: integer("seats"),
});

export const workspace = pgTable("workspace", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	name: text("name").notNull(),
	slug: text("slug").unique(),
	logo: text("logo"),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
	metadata: text("metadata"),
});

export const member = pgTable("member", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	workspaceId: uuid("workspace_id")
		.notNull()
		.references(() => workspace.id, { onDelete: "cascade" }),
	userId: uuid("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	role: text("role").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
});

export const invitation = pgTable("invitation", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	workspaceId: uuid("workspace_id")
		.notNull()
		.references(() => workspace.id, { onDelete: "cascade" }),
	email: text("email").notNull(),
	role: text("role"),
	status: text("status").notNull(),
	expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
	inviterId: uuid("inviter_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const team = pgTable("team", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	name: text("name").notNull(),
	workspaceId: uuid("workspace_id")
		.notNull()
		.references(() => workspace.id, { onDelete: "cascade" }),
	description: text("description"),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp("updated_at", { withTimezone: true }),
});

export const teamMember = pgTable("team_member", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	teamId: uuid("team_id")
		.notNull()
		.references(() => team.id, { onDelete: "cascade" }),
	userId: uuid("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	role: text("role").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
});

export const workspaceRelations = relations(workspace, ({ many }) => ({
	members: many(member),
	teams: many(teamMember),
}));

export const memberRelations = relations(member, ({ one }) => ({
	workspace: one(workspace, {
		fields: [member.workspaceId],
		references: [workspace.id],
	}),
	user: one(user, {
		fields: [member.userId],
		references: [user.id],
	}),
}));

export const teamRelations = relations(team, ({ one, many }) => ({
	workspace: one(workspace, {
		fields: [team.workspaceId],
		references: [workspace.id],
	}),
	teamMembers: many(teamMember),
}));

export const teamMemberRelations = relations(teamMember, ({ one, many }) => ({
	team: one(team, {
		fields: [teamMember.teamId],
		references: [team.id],
	}),
	user: one(user, {
		fields: [teamMember.userId],
		references: [user.id],
	}),
}));

export const userRelations = relations(user, ({ many, one }) => ({
	members: one(member, {
		fields: [user.id],
		references: [member.userId],
	}),
	teams: many(teamMember),
	session: many(session),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
	workspace: one(workspace, {
		fields: [session.activeWorkspaceId],
		references: [workspace.id],
	}),
}));
