"use client"
import Link from "next/link";
import { MdOutlineChevronLeft } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { UserSchema } from "@/Schemas";
import {useForm,Controller,SubmitHandler} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

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
import { Button } from "@/components/ui/button";


type Input={
	name:string,
	lastName:string,
	status:string,
	dni:string,
	role:string,
	number:string,
	email:string
	password:string,
	confirmPassword:string
}

export default function Page({params} : {params : { id : string } } ) {
	const {register,reset, control,watch,handleSubmit, formState:{errors} } = useForm<Input>({
		resolver:zodResolver(UserSchema)
	})

	const router = useRouter()

	const onSubmit: SubmitHandler<Input> = (data) => {
		toast("Usuario Editado Correctamente", {
			description: "Sunday, December 03, 2023 at 9:00 AM",
			duration: 5000,
			action: {
				label: "Entendido",
				onClick: () => console.log("Entendido"),
			},
		});
		router.push('/admin/users');
		reset();
	}
	return (
		<>
			<section className="max-w-screen-xl w-full mx-auto flex items-center justify-start gap-5">
				<Button asChild variant={"outline"} size={"icon"}>
					<Link href={"/admin/users"}><MdOutlineChevronLeft size={25}/></Link>
				</Button>

				<h1 className="text-3xl">Editar Usuario {params.id}</h1>
			</section>

			<form onSubmit={handleSubmit(onSubmit)} className="flex max-w-screen-xl w-full mx-auto max-lg:flex-col gap-5">

				<div className="flex flex-col gap-5 w-full lg:w-[60%]">
					<Card className="max-w-72">
						<CardHeader>
							<CardTitle className="text-xl font-normal">
								Estado
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Controller
                                name="status"
                                control={control}
                                defaultValue="1"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="hover:bg-secondary">
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent position="popper" sideOffset={5} hideWhenDetached>
                                            <SelectItem value="1">Activo</SelectItem>
                                            <SelectItem value="0">Inactivo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
							{
								errors.status && <p className="text-red-600 text-xs">{errors.status.message}</p>
							}
						</CardContent>
					</Card>

					<Card className="max-w-screen-md">
						<CardHeader>
							<CardTitle className="text-xl font-normal">Detalles</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
                            <label className="flex flex-col gap-2">
								<span className="text-sm">DNI</span>
								<Input id="dni" {...register("dni")}/>
								{
									errors.dni && <p className="text-red-600 text-xs">{errors.dni.message}</p>
								}
							</label>
							<label className="flex flex-col gap-2">
								<span className="text-sm">Nombres</span>
								<Input id="name" {...register("name")}/>
								{
									errors.name && <p className="text-red-600 text-xs">{errors.name.message}</p>
								}
							</label>

							<label  className="flex flex-col gap-2">
								<span className="text-sm">Apellidos</span>
								<Input id="lastName" {...register("lastName")}/>
								{
									errors.lastName && <p className="text-red-600 text-xs">{errors.lastName.message}</p>
								}
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
								<Input id="email" {...register("email")}/>
								{
									errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>
								}
							</label>

							<label className="flex flex-col gap-2 w-full">
								<span className="text-sm">Número</span>
								<Input id="number" {...register("number")}/>
								{
									errors.number && <p className="text-red-600 text-xs">{errors.number.message}</p>
								}
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
							<Controller
                                name="role"
                                control={control}
                                defaultValue="1"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="hover:bg-secondary">
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent position="popper" sideOffset={5} hideWhenDetached>
                                            <SelectItem value="1">Administrador</SelectItem>
                                            <SelectItem value="2">Vendedor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
							{
								errors.role && <p className="text-red-600 text-xs">{errors.role.message}</p>
							}
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle className="text-xl font-normal">Contraseña</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-5">
							<label className="flex flex-col gap-2 w-full">
								<span className="text-sm">Contraseña</span>
								<Input id="password" {...register("password")}/>
								{
									errors.password && <p className="text-red-600 text-xs">{errors.password.message}</p>
								}
							</label>

							<label className="flex flex-col gap-2 w-full">
								<span className="text-sm">Confirmar Contraseña</span>
								<Input id="confirmPassword" {...register("confirmPassword")}/>
								{
									errors.confirmPassword && <p className="text-red-600 text-xs">{errors.confirmPassword.message}</p>
								}
							</label>
						</CardContent>
					</Card>

					<Button variant={"secondary"}>
						Guardar Usuario
					</Button>

				</div>

			</form>
		</>
	);
}