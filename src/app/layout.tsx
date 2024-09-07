import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { aldrich } from "@/app/config/fonts"
import "./globals.css";


export const metadata: Metadata = {
	title: "Sistema MASS",
	description: "Sistema creado para el curso de Calidad de Software",
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
						
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</>
	);
}
