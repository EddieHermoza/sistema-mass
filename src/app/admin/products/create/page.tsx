"use client"
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { MdOutlineChevronLeft } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import { ProductSchema } from "@/Schemas";
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
import ImageUploader from "@/components/ui/image-uploader";

type Input={
	name:string,
	description:string,
	status:string,
	category:string,
	provider:string,
	price:string,
	initStock:string
}

export default function Page() {
	const {register,reset, control,watch,handleSubmit, formState:{errors} } = useForm<Input>({
		resolver:zodResolver(ProductSchema)
	})

	const router = useRouter()

	const onSubmit: SubmitHandler<Input> = (data) => {
		toast("Producto Creado Correctamente", {
			description: "Sunday, December 03, 2023 at 9:00 AM",
			duration: 5000,
			action: {
				label: "Entendido",
				onClick: () => console.log("Entendido"),
			},
		});
		router.push('/admin/products');
		reset();
	}

	return (
		<>
			<section className="max-w-screen-xl w-full mx-auto flex items-center justify-start  gap-5">

				<Link href={"/admin/products"} className="bg-background hover:bg-accent border p-1 focus:border-none rounded flex-center duration-200 focus:ring ring-ring ring-offset-2"><MdOutlineChevronLeft size={25} /></Link>

				<h1 className="text-3xl">Nuevo Producto</h1>

			</section>

			<form onSubmit={handleSubmit(onSubmit)} className="flex max-w-screen-xl max-lg:flex-col w-full mx-auto gap-5">

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
						<CardContent className="space-y-2">
							<label className="flex flex-col gap-2">
								<span>Nombre</span>
								<Input id="name" {...register("name")}/>
								{
									errors.name && <p className="text-red-600 text-xs">{errors.name.message}</p>
								}
							</label>

							<label className="flex flex-col gap-2">
								<span>Descripción</span>
								<Textarea id="description" {...register("description")}/>
								{
									errors.description && <p className="text-red-600 text-xs ">{errors.description.message}</p>
								}
							</label>
						</CardContent>
					</Card>
					<div className="flex max-md:flex-col w-full gap-5">
						<Card className="w-full">
							<CardHeader>
								<CardTitle className="text-xl font-normal">Proveedor</CardTitle>
							</CardHeader>
							<CardContent>
								<Controller
									name="provider"
									control={control}
									defaultValue="0"
									render={({ field }) => (
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className="hover:bg-secondary">
												<SelectValue placeholder="Seleccionar" />
											</SelectTrigger>
											<SelectContent position="popper" sideOffset={5} hideWhenDetached>
												<SelectItem value="0">Proveedor 1</SelectItem>
												<SelectItem value="1">Proveedor 2</SelectItem>
												<SelectItem value="2">Proveedor 3</SelectItem>
												<SelectItem value="3">Proveedor 4</SelectItem>
											</SelectContent>
										</Select>
									)}
								/>
								{
									errors.provider && <p className="text-red-600 text-xs">{errors.provider.message}</p>
								}
							</CardContent>
						</Card>
						<Card className="w-full">
							<CardHeader>
								<CardTitle className="text-xl font-normal">Categoria</CardTitle>
							</CardHeader>
							<CardContent>
								<Controller
									name="category"
									control={control}
									defaultValue="0"
									render={({ field }) => (
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className="hover:bg-secondary">
												<SelectValue placeholder="Seleccionar" />
											</SelectTrigger>
											<SelectContent position="popper" sideOffset={5} hideWhenDetached>
												<SelectItem value="0">Categoria 1</SelectItem>
												<SelectItem value="1">Categoria 2</SelectItem>
												<SelectItem value="2">Categoria 3</SelectItem>
												<SelectItem value="3">Categoria 4</SelectItem>
											</SelectContent>
										</Select>
									)}
								/>
								{
									errors.category && <p className="text-red-600 text-xs">{errors.category.message}</p>
								}
							</CardContent>
						</Card>
					</div>
					<div className="flex gap-5 max-md:flex-col w-full">
						<Card className="w-full">
							<CardHeader>
								<CardTitle className="text-xl font-normal">Precio</CardTitle>
							</CardHeader>
							<CardContent>
								<label className="flex flex-col gap-2">
									<Input type="number" defaultValue={0} min={0} id="price" {...register("price")}/>
								</label>
								{
									errors.price && <p className="text-red-600 text-xs">{errors.price.message}</p>
								}
							</CardContent>
						</Card>

						<Card className="w-full">
							<CardHeader>
								<CardTitle className="text-xl font-normal">Stock Inicial</CardTitle>
							</CardHeader>
							<CardContent>
								<label className="flex flex-col gap-2">
									<Input type="number" defaultValue={0} min={0} id="initStock" {...register("initStock")} />
								</label>
								{
									errors.initStock && <p className="text-red-600 text-xs">{errors.initStock.message}</p>
								}
							</CardContent>
						</Card>
					</div>

				</div>
				<div className="w-full lg:w-[40%] relative flex flex-col gap-5">

					<Card className="w-full h-auto relative">
						<CardHeader>
							<CardTitle className="text-xl font-normal">Imagen</CardTitle>
							<CardDescription>
								Arrastra las imágenes en el contenedor o haz clic para seleccionar
							</CardDescription>
						</CardHeader>
						<CardContent >
							<ImageUploader />
						</CardContent>
					</Card>

					<button type="submit" className=" bg-black dark:bg-primary w-full  dark:hover:bg-primary/80 hover:bg-black/80 p-3 rounded text-white dark:text-primary-foreground flex-center duration-200 focus:ring ring-ring ring-offset-2 px-4 py-2">Guardar Producto</button>

				</div>

			</form>


		</>
	);
}