import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToogleTheme } from "@/components/ui/toggle-theme";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

export default function LoginPage() {
	return (
		<main className="h-screen w-full flex-center flex-col gap-2">
			<div className="w-full flex items-center justify-end max-w-md px-3">
				<ToogleTheme />
			</div>
			<Card className="max-w-md w-full">
				<CardHeader>
					<CardTitle className="text-center text-3xl">Iniciar Sesión</CardTitle>
				</CardHeader>
				<CardContent>
					<form>
						<div className="grid w-full items-center gap-5">

							<label htmlFor="name" className="flex flex-col gap-2">
								<span>Correo Electrónico</span>
								<Input id="name" />
							</label>

							<label htmlFor="password" className="flex flex-col gap-2">
								<span>Contraseña</span>
								<Input id="password" type="password"/>
							</label>

							<Link href={"/admin/dashboard"} className="bg-primary text-primary-foreground w-full py-3 rounded flex-center hover:shadow-md hover:shadow-primary/50 duration-200 focus:ring ring-ring ring-offset-2">Iniciar Sesión</Link>

						</div>
					</form>
				</CardContent>
			</Card>

		</main>
	);
}