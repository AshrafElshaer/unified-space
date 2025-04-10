"use client";

import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@unified/ui/components/sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import type * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
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
		</QueryClientProvider>
	);
}
