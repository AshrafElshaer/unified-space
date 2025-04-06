import { Button } from "@workspace/ui/components/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@workspace/ui/components/card";

export default function Page() {
	return (
		<div className="flex items-center justify-center min-h-svh">
			<div className="flex flex-col items-center justify-center gap-4 w-full">
				<h1 className="text-2xl font-bold">Hello World</h1>
				<Button size="sm">Button</Button>
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
