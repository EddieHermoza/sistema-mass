import Link from "next/link";
import { MdOutlineChevronLeft } from "react-icons/md";
import { Input } from "@/components/ui/input";
import {
	Card, 
	CardHeader, 
	CardTitle, 
	CardContent,
	CardDescription
} from "@/components/ui/card"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"




export default function Page() {

	return (
		<>
			<section className="max-w-screen-xl w-full mx-auto flex items-center justify-start gap-5">
				<Link href={"/admin/users"} className="bg-background hover:bg-accent border p-1 focus:border-none rounded flex-center duration-200 focus:ring ring-ring ring-offset-2"><MdOutlineChevronLeft size={25}/></Link>

				<h1 className="text-3xl">Nuevo Usuario</h1>
			</section>

			<form className="flex max-w-screen-xl w-full mx-auto max-lg:flex-col gap-5">

				<div className="flex flex-col gap-5 w-full lg:w-[60%]">
					<Card className="max-w-72">
						<CardHeader>
							<CardTitle className="text-xl font-normal">
								Estado
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Select defaultValue="en">
								<SelectTrigger className="hover:bg-secondary">
									<SelectValue />
								</SelectTrigger>
								<SelectContent position="popper" sideOffset={5} hideWhenDetached>
									<SelectItem value="en">Activo</SelectItem>
									<SelectItem value="dis">Inactivo</SelectItem>
								</SelectContent>
							</Select>
						</CardContent>
					</Card>

					<Card className="max-w-screen-md">
						<CardHeader>
							<CardTitle className="text-xl font-normal">Detalles</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
                            <label className="flex flex-col gap-2">
								<span className="text-sm">DNI</span>
								<Input id="name" />
							</label>
							<label className="flex flex-col gap-2">
								<span className="text-sm">Nombres</span>
								<Input id="name" />
							</label>

							<label  className="flex flex-col gap-2">
								<span className="text-sm">Apellidos</span>
                                <Input id="name" />
							</label>
						</CardContent>
					</Card>

					<Card className="max-w-screen-md">
						<CardHeader>
							<CardTitle className="text-xl font-normal">Contacto</CardTitle>
						</CardHeader>
						<CardContent className="flex gap-5 max-md:flex-col">
							<label className="flex flex-col gap-2 w-full">
								<span className="text-sm">Correo Electrónico</span>
								<Input id="name" />
							</label>

							<label className="flex flex-col gap-2 w-full">
								<span className="text-sm">Número</span>
                                <Input id="name" />
							</label>
						</CardContent>
					</Card>
				</div>

				<div className="w-full lg:w-[40%] relative flex flex-col gap-5">
                    <Card className="w-full">
						<CardHeader>
							<CardTitle className="text-xl font-normal">Rol asignado</CardTitle>
						</CardHeader>
						<CardContent>
                            <Select >
								<SelectTrigger className="hover:bg-secondary">
									<SelectValue placeholder="Seleccionar"/>
								</SelectTrigger>
								<SelectContent position="popper" sideOffset={5} hideWhenDetached>
									<SelectItem value="1">rol 1</SelectItem>
                                    <SelectItem value="2">rol 2</SelectItem>
									<SelectItem value="3">rol 3</SelectItem>
								</SelectContent>
							</Select>
						</CardContent>
					</Card>
					<button className="bg-black dark:bg-primary dark:hover:bg-primary/80 hover:bg-black/80 p-3 rounded text-white dark:text-primary-foreground flex-center duration-200 focus:ring ring-ring ring-offset-2 px-4 py-2">Guardar Usuario</button>
				</div>

			</form>
		</>
	);
}