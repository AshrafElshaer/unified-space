ALTER TABLE "team" ADD COLUMN "leader_id" uuid;--> statement-breakpoint
ALTER TABLE "workspace" ADD COLUMN "owner_id" uuid;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_leader_id_user_id_fk" FOREIGN KEY ("leader_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;