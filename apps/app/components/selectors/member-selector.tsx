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
type Props = {
	value: string;
	onChange: (value: string) => void;
};
export function MemberSelector({ value, onChange }: Props) {
	const { data: workspace } = useWorkspace();
	const { data: sessionData } = useSession();

	const { data: members } = useQuery({
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
				{members?.map((member) => (
					<SelectItem key={member.id} value={member.id}>
						<Avatar className="size-6">
							<AvatarImage src={member.user.image ?? undefined} />
							<AvatarFallback>
								{member.user.name[0]}
								{member.user.name[1]}
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
