"use server";
import { eq } from "drizzle-orm";
import { db } from "../database";
import { user } from "../schema";
import type { updateUserSchema } from "../validations";

import type { z } from "zod";
type UpdateUser = z.infer<typeof updateUserSchema>;

export async function updateUser(data: UpdateUser) {
	if (!data.id) {
		throw new Error("User ID is required");
	}
	const [updatedUser] = await db
		.update(user)
		.set(data)
		.where(eq(user.id, data.id))
		.returning();
	return updatedUser;
}
