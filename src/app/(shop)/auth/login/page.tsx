
import { Input } from "@/components/ui/input";
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
        <>
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">Iniciar Sesión</CardTitle>
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
                            
                            <div className="w-full flex-center flex-col gap-2 relative">
                                <Button asChild variant={"outline"} className="text-xl w-full">
                                    <Link href={"/auth/register"}>Registrarse</Link>
                                </Button>
                                o
                                <Button asChild className="text-xl w-full">
                                    <Link href={"/admin/dashboard"}>Iniciar Sesión</Link>
                                </Button>
                            </div>


                        </div>
                    </form>
                </CardContent>
            </Card>

        </>
    );
}