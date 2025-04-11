import type { team, teamMember, user } from "./schema";

type Team = typeof team.$inferSelect;
type TeamMember = typeof teamMember.$inferSelect;
type User = typeof user.$inferSelect;

export type TeamsWithMembers = Team & {
	members: (TeamMember & { user: User })[];
};
