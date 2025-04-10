"use server";
import { eq } from "drizzle-orm";
import { db } from "../database";
import { session } from "../schema";

type Session = typeof session.$inferSelect;

export async function updateSessionByToken(
	token: string,
	data: Partial<Session>,
) {
	return await db.update(session).set(data).where(eq(session.token, token));
}
