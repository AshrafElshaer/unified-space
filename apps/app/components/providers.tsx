"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@unified/ui/components/sonner";

import type * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NuqsAdapter>
			<NextThemesProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
				enableColorScheme
			>
				{children}
				<Toaster richColors duration={5000} position="top-right" />
			</NextThemesProvider>
		</NuqsAdapter>
	);
}
