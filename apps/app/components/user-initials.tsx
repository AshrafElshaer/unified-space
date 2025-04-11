export function UserInitials({ name }: { name: string }) {
	const [first, last] = name.split(" ");
	return `${first?.[0] ?? ""}${last?.[0] ?? ""}`;
}
