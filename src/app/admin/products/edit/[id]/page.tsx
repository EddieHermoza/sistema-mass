import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
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
import ImageUploader from "@/components/ui/image-uploader";




export default function Page( {params} : {params : { id : string } } ) {

	return (
		<>
			<section className="max-w-screen-xl w-full mx-auto flex items-center justify-start  gap-5">

				<Link href={"/admin/products"} className="bg-background hover:bg-accent border p-1 focus:border-none rounded flex-center duration-200 focus:ring ring-ring ring-offset-2"><MdOutlineChevronLeft size={25}/></Link>

				<h1 className="text-3xl">Editar Producto {params.id}</h1>

			</section>

			<form className="flex max-w-screen-xl max-lg:flex-col w-full mx-auto gap-5">

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
						<CardContent className="space-y-2">
							<label className="flex flex-col gap-2">
								<span>Nombre</span>
								<Input id="name" />
							</label>

							<label  className="flex flex-col gap-2">
								<span>Descripción</span>
								<Textarea />
							</label>
						</CardContent>
					</Card>
					<div className="flex max-md:flex-col w-full gap-5">
						<Card className="w-full">
							<CardHeader>
								<CardTitle className="text-xl font-normal">Proveedor</CardTitle>
							</CardHeader>
							<CardContent>
								<Select >
									<SelectTrigger className="hover:bg-secondary">
										<SelectValue placeholder="Seleccionar"/>
									</SelectTrigger>
									<SelectContent position="popper" sideOffset={5} hideWhenDetached>
										<SelectItem value="1">Proveedor 1</SelectItem>
										<SelectItem value="2">Proveedor 2</SelectItem>
										<SelectItem value="3">Proveedor 3</SelectItem>
										<SelectItem value="4">Proveedor 4</SelectItem>
										<SelectItem value="5">Proveedor 5</SelectItem>
									</SelectContent>
								</Select>
							</CardContent>
						</Card>
						<Card className="w-full">
							<CardHeader>
								<CardTitle className="text-xl font-normal">Categoria</CardTitle>
							</CardHeader>
							<CardContent>
								<Select >
									<SelectTrigger className="hover:bg-secondary">
										<SelectValue placeholder="Seleccionar"/>
									</SelectTrigger>
									<SelectContent position="popper" sideOffset={5} hideWhenDetached>
										<SelectItem value="1">Categoria 1</SelectItem>
										<SelectItem value="2">Categoria 2</SelectItem>
										<SelectItem value="3">Categoria 3</SelectItem>
										<SelectItem value="4">Categoria 4</SelectItem>
										<SelectItem value="5">Categoria 5</SelectItem>
									</SelectContent>
								</Select>
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
									<Input type="number" id="name" />
								</label>
							</CardContent>
						</Card>

						<Card  className="w-full">
							<CardHeader>
								<CardTitle className="text-xl font-normal">Stock Inicial</CardTitle>
							</CardHeader>
							<CardContent>
								<label className="flex flex-col gap-2">
									<Input type="number" id="name" />
								</label>
							</CardContent>
						</Card>
					</div>

				</div>
				<div className="w-full lg:w-[40%] relative flex flex-col gap-5">

					<Card  className="w-full h-auto relative">
						<CardHeader>
							<CardTitle className="text-xl font-normal">Imagen</CardTitle>
							<CardDescription>
								Arrastra las imágenes en el contenedor o haz clic para seleccionar
							</CardDescription>
						</CardHeader>
						<CardContent >
							<ImageUploader/>
						</CardContent>
					</Card>

					<button className="bg-black dark:bg-primary w-full  dark:hover:bg-primary/80 hover:bg-black/80 p-3 rounded text-white dark:text-primary-foreground flex-center duration-200 focus:ring ring-ring ring-offset-2 px-4 py-2">Guardar Producto</button>
					
				</div>

			</form>


		</>
	);
}