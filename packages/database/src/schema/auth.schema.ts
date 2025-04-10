import { relations, sql } from "drizzle-orm";
import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import {
	team,
	teamMember,
	workspace,
	workspaceMember,
} from "./workspace.schema";

export const user = pgTable("user", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.default(sql`now()`),
	stripeCustomerId: text("stripe_customer_id"),
	phoneNumber: text("phone_number").unique(),
	phoneNumberVerified: boolean("phone_number_verified"),
});

export const session = pgTable("session", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.default(sql`now()`),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: uuid("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
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
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.default(sql`now()`),
});

export const verification = pgTable("verification", {
	id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.default(sql`now()`),
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

export const userRelations = relations(user, ({ many, one }) => ({
	teams: many(teamMember),
	workspaceMembers: one(workspaceMember, {
		fields: [user.id],
		references: [workspaceMember.userId],
	}),
	workspaces: one(workspace, {
		fields: [user.id],
		references: [workspace.id],
	}),
}));
