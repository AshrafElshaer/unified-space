DROP INDEX "team_member_team_id_user_id_idx";--> statement-breakpoint
ALTER TABLE "team_member" ADD CONSTRAINT "team_member_unique" UNIQUE("team_id","user_id");