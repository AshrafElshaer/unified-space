"use client";

import { useSession } from "@/hooks/use-session";
import { useWorkspace } from "@/hooks/use-workspace";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaceMembers } from "@unified/database/queries";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@unified/ui/components/avatar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@unified/ui/components/select";
import { Skeleton } from "@unified/ui/components/skeleton";
import { UserInitials } from "../user-initials";
type Props = {
	value: string;
	onChange: (value: string) => void;
};
export function MemberSelector({ value, onChange }: Props) {
	const { data: workspace } = useWorkspace();
	const { data: sessionData } = useSession();

	const { data: members, isLoading } = useQuery({
		queryKey: ["workspace-members"],
		queryFn: () => getWorkspaceMembers(workspace?.id ?? ""),
		enabled: !!workspace?.id,
	});
	return (
		<Select value={value} onValueChange={onChange}>
			<SelectTrigger className="w-full bg-accent">
				<SelectValue placeholder="Select a member" />
			</SelectTrigger>
			<SelectContent>
				{isLoading
					? [1, 2, 3].map((i) => (
							<SelectItem
								key={i}
								value={i.toString()}
								disabled
								className="flex items-center gap-2"
							>
								<Skeleton className="size-4 rounded-full" />
								<Skeleton className="w-32 h-4" />
							</SelectItem>
						))
					: members?.map((member) => (
							<SelectItem key={member.user.id} value={member.user.id}>
								<Avatar className="size-4">
									<AvatarImage src={member.user.image ?? undefined} />
									<AvatarFallback className="text-xs">
										<UserInitials name={member.user.name} />
									</AvatarFallback>
								</Avatar>
								{member.user.name}{" "}
								{member.userId === sessionData?.user?.id && "(You)"}
							</SelectItem>
						))}
			</SelectContent>
		</Select>
	);
}
