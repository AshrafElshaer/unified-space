import { Geist, Geist_Mono } from "next/font/google";

import "@unified/ui/globals.css";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";

const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

const baseUrl = "https://app.getunified.space";

export const metadata: Metadata = {
	metadataBase: new URL(baseUrl),
	title: {
		default: "Unified Space",
		template: "%s | Unified Space",
	},
	description: "Unified space is all in one place for your remote team.",
	openGraph: {
		title: "Unified space | All in one place for your remote team",
		description: "Unified space is all in one place for your remote team.",
		url: baseUrl,
		siteName: "Unified Space",
		locale: "en_US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export const viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)" },
		{ media: "(prefers-color-scheme: dark)" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
