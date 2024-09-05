import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"

import "./globals.css";
import { aldrich } from "@/app/config/fonts"


export const metadata: Metadata = {
	title: "Sistema MASS",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<html lang="en" suppressHydrationWarning>
				<head />
				<body className={`${aldrich.className}`}>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
					>
						<div vaul-drawer-wrapper="" className="bg-background ">
							{children}
						</div>
					</ThemeProvider>
				</body>
			</html>
		</>
	);
}
