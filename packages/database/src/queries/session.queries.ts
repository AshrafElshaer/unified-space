"use server";
import { eq } from "drizzle-orm";
import { db } from "../database";
import { session } from "../schema";

export const getSessionById = async (sessionId: string) => {
	return await db.query.session.findFirst({
		where: eq(session.id, sessionId),
	});
};
