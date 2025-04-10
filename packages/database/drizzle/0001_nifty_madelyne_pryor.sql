ALTER TABLE "workspace" RENAME COLUMN "slug" TO "metadata";--> statement-breakpoint
ALTER TABLE "workspace" DROP CONSTRAINT "workspace_slug_unique";--> statement-breakpoint
ALTER TABLE "workspace" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "workspace" ALTER COLUMN "updated_at" DROP NOT NULL;