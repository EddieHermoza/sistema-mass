
import { Input } from "@/components/ui/input";
import { ToogleTheme } from "@/components/ui/toggle-theme";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Page() {
    return (
        <main className="h-[calc(100vh-120px)] w-full flex-center flex-col gap-2">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Registrarse</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-10">

                            <label htmlFor="name" className="flex flex-col gap-2">
                                <span>Correo Electrónico</span>
                                <Input id="name" />
                            </label>

                            <label htmlFor="password" className="flex flex-col gap-2">
                                <span>Contraseña</span>
                                <Input id="password" type="password" />
                            </label>


                            <div className="relative w-full flex-center flex-col gap-2">
                                <Button asChild variant={"outline"} className="text-xl w-full">
                                    <Link href={"/auth/login"}>Iniciar Sesión</Link>
                                </Button>
                                o
                                <Button asChild className="text-xl w-full">
                                    <Link href={"/"}>Registrarse</Link>
                                </Button>
                            </div>

                        </div>
                    </form>
                </CardContent>
            </Card>

        </main>
    );
}