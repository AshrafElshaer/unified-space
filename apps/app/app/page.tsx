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

export default function Page() {
	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4 w-full">
				<h1 className="text-2xl font-bold">Hello World</h1>
				<Button size="sm">Button</Button>
				<CopyButton content="Hello World" />
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
