"use server";
import { auth } from "@/lib/auth/server";
import {
	createWorkspace,
	createWorkspaceMember,
} from "@unified/database/mutations";
import { insertWorkspaceSchema } from "@unified/database/validations";
import { redirect } from "next/navigation";

import { authActionClient } from "@/lib/safe-action";

export const createWorkspaceAction = authActionClient
	.metadata({
		name: "create-workspace",
	})
	.schema(insertWorkspaceSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { session } = ctx;

		const workspace = await createWorkspace({
			name: parsedInput.name,
			metadata: parsedInput.metadata || "",
		});

		if (!workspace) {
			throw new Error("Failed to create workspace");
		}

		await createWorkspaceMember({
			workspaceId: workspace.id,
			userId: session.user.id,
			role: "owner",
		});

		redirect("/");
	});
