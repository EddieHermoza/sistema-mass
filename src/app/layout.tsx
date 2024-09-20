import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { aldrich } from "@/app/config/fonts"
import { META_DATA } from "@/app/config/metadata";
import "./globals.css";

export const metadata:Metadata = META_DATA

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<html lang="es" suppressHydrationWarning className="scrollbar-thin scrollbar-track-background scrollbar-thumb-primary">

				<body className={`${aldrich.className} `} >
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						<div vaul-drawer-wrapper="" className="bg-background ">
							{children}
						</div>
						<Toaster  />
						
					</ThemeProvider>
				</body>
			</html>
		</>
	);
}
