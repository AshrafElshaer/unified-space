"use client";
import { UserInitials } from "@/components/user-initials";
import { useSession } from "@/hooks/use-session";
import type { TeamsWithMembers } from "@unified/database/types";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@unified/ui/components/avatar";
import { Button } from "@unified/ui/components/button";
import { Separator } from "@unified/ui/components/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@unified/ui/components/tooltip";
import { Check, Ellipsis } from "lucide-react";

type Props = {
	teams: TeamsWithMembers[];
};

export function TeamsList({ teams }: Props) {
	const { data: sessionData } = useSession();
	return (
		<div className="flex flex-col overflow-x-auto flex-1">
			<table className="w-full overflow-x-auto">
				<thead>
					<tr className="border-b">
						<th className="text-left px-4 py-2 font-normal text-muted-foreground min-w-24">
							Name
						</th>
						<th className="text-center px-4 py-2 font-normal text-muted-foreground">
							Membership
						</th>
						<th className="text-center px-4 py-2 font-normal text-muted-foreground">
							Members
						</th>
						<th className="text-center px-4 py-2 font-normal text-muted-foreground">
							Project
						</th>
						<th className="text-right px-4 py-2 font-normal text-muted-foreground">
							{" "}
						</th>
					</tr>
				</thead>
				<tbody>
					{teams.map((team) => (
						<tr key={team.id} className="border-b hover:bg-muted text-sm">
							<td className="px-4 py-2 min-w-fit">
								<div className="min-w-36">{team.name}</div>
							</td>
							<td className="text-center px-4 py-2 ">
								{team.members.some(
									(member) => member.userId === sessionData?.user.id,
								) ? (
									<p className="flex items-center gap-2 justify-center">
										<Check className="size-4 text-success" />
										<span className="text-success">Joined</span>
									</p>
								) : (
									" "
								)}
							</td>
							<td className="text-center px-4 py-2">
								<div className="*:data-[slot=avatar]:ring-background flex justify-center -space-x-2 *:data-[slot=avatar]:size-8 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
									<TooltipProvider delayDuration={0}>
										{team.members.map((member) => (
											<Tooltip key={member.id}>
												<TooltipTrigger asChild>
													<Avatar key={member.id}>
														<AvatarImage src={member.user.image ?? undefined} />
														<AvatarFallback className="text-xs ">
															<UserInitials name={member.user.name} />
														</AvatarFallback>
													</Avatar>
												</TooltipTrigger>
												<TooltipContent>
													<p>{member.user.name}</p>
												</TooltipContent>
											</Tooltip>
										))}
									</TooltipProvider>
								</div>
							</td>
							<td className="text-center px-4 py-2">0</td>
							<td className="text-right px-4 py-2">
								<Button variant="ghost" size="icon">
									<Ellipsis className="size-4" />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
