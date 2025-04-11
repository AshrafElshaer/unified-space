"use server";
import { auth } from "@/lib/auth/server";
import {
	createWorkspace,
	createWorkspaceMember,
} from "@unified/database/mutations";
import {
	insertWorkspaceSchema,
	updateUserSchema,
} from "@unified/database/validations";
import { redirect } from "next/navigation";

import { authActionClient } from "@/lib/safe-action";
import { updateUser } from "@unified/database/mutations";

export const updateUserAction = authActionClient
	.metadata({
		name: "update-user",
	})
	.schema(updateUserSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { session } = ctx;

		await updateUser({
			id: session.user.id,
			name: parsedInput.name,
			phoneNumber: parsedInput.phoneNumber,
		});

		redirect("/onboarding/workspace");
	});
export const createWorkspaceAction = authActionClient
	.metadata({
		name: "create-workspace",
	})
	.schema(insertWorkspaceSchema.omit({ ownerId: true }))
	.action(async ({ parsedInput, ctx }) => {
		const { session } = ctx;

		const workspace = await createWorkspace({
			name: parsedInput.name,
			metadata: parsedInput.metadata || "",
			ownerId: session.user.id,
		});

		if (!workspace) {
			throw new Error("Failed to create workspace");
		}

		await createWorkspaceMember({
			workspaceId: workspace.id,
			userId: session.user.id,
			role: "owner",
		});

		redirect("/onboarding/congrats");
	});
