"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { CheckIcon, CopyIcon } from "lucide-react";
import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

import { buttonVariants } from "@unified/ui/components/button";
import { cn } from "@unified/ui/lib/utils";

interface CopyButtonProps
	extends Omit<HTMLMotionProps<"button">, "children">,
		VariantProps<typeof buttonVariants> {
	content: string;
	delay?: number;
}

const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
	({ content, className, size, variant, delay = 3000, ...props }, ref) => {
		const [isCopied, setIsCopied] = React.useState(false);
		const Icon = isCopied ? CheckIcon : CopyIcon;

		const handleCopy = React.useCallback(() => {
			if (isCopied) return;
			navigator.clipboard
				.writeText(content)
				.then(() => {
					setIsCopied(true);
					setTimeout(() => setIsCopied(false), delay);
				})
				.catch((error) => {
					console.error("Error copying command", error);
				});
		}, [isCopied, content, delay]);

		return (
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className={cn(buttonVariants({ variant, size }), className)}
				onClick={handleCopy}
				{...props}
				ref={ref}
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={isCopied ? "check" : "copy"}
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
						transition={{ duration: 0.15 }}
					>
						<Icon />
					</motion.div>
				</AnimatePresence>
			</motion.button>
		);
	},
);

CopyButton.displayName = "CopyButton";

export { CopyButton,type CopyButtonProps };
