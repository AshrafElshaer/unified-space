import { Input, type InputProps } from "@unified/ui/components/inputs/input";
import { cn } from "@unified/ui/lib/utils";

export const UrlInput = ({
	className,
	urlPlaceholder,
	...props
}: InputProps & { urlPlaceholder?: string }) => {
	return (
		<div className="relative">
			<Input
				{...props}
				className={cn("!pl-16", className)}
				isUrl
				inputMode="url"
			/>
			<span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center pl-3 text-sm text-muted-foreground peer-disabled:opacity-50">
				{urlPlaceholder || "https://"}
			</span>
		</div>
	);
};
