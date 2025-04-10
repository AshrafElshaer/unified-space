import { auth } from "@/lib/auth/server";
import { CopyButton } from "@unified/ui/components/animate-ui/copy-button";
import { Button } from "@unified/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@unified/ui/components/card";
import { Input } from "@unified/ui/components/inputs/input";
import { headers } from "next/headers";

type PageProps = {
	params: Promise<{
		organizationSlug: string;
	}>;
};

export default async function Page({ params }: PageProps) {
	const { organizationSlug } = await params;

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<div className="flex items-center justify-center flex-1 p-4">
			<div className="flex flex-col items-center justify-center gap-4 w-full">
				<h1 className="text-2xl font-bold">{organizationSlug}</h1>
				<Button size="sm">Button</Button>
				<Input placeholder="Input" />
				<CopyButton content="Hello World" variant="secondary" />
				<Button size="sm" variant="secondary">
					Button
				</Button>
				<Button size="sm" variant="outline">
					Button
				</Button>
				<Button size="sm" variant="destructive">
					Button
				</Button>
				<Button size="sm" variant="ghost">
					Button
				</Button>
				<Button size="sm" variant="link">
					Button
				</Button>
				<Button size="sm" variant="success">
					Button
				</Button>
				<Button size="sm" variant="warning">
					Button
				</Button>
				<Card className="bg-accent">
					<CardHeader>
						<CardTitle>title</CardTitle>
						<CardDescription>description</CardDescription>
					</CardHeader>
					<CardContent>content lets see how this looks</CardContent>
					<CardFooter>footer</CardFooter>
				</Card>
			</div>
		</div>
	);
}
