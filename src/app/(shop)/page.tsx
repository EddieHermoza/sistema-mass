
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { ProductsCarousel } from "@/components/shop/products-carousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GridCategories from "@/components/shop/categories-grid";
import { CATEGORIES } from "@/data/categories";

export default function Page() {
	return (
		<>
			<main className="w-full flex flex-col gap-16 py-10 px-2 sm:px-5">

				<section className="relative container flex-center my-5 sm:my-10 animate-in fade-in-0  duration-3000">
					<h2 className="text-5xl lg:text-6xl xl:text-8xl inline-block">
						Bienvenido, <span className="text-primary animate-pulse">Usuario</span>
					</h2>
				</section>

				<section className="relative w-full">
					<GridCategories/>
				</section>

				<section className="container relative ">
					<label className="relative flex-center ">
						<IoSearchOutline className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Buscar Productos"
							className="rounded-lg bg-background pl-8 w-full focus-visible:h-14 "
					/>
					</label>
				</section>
				{
					CATEGORIES.map((category,index)=>(
						<section key={index} className="relative container space-y-5 max-sm:p-0" >
							<div className="flex justify-between items-end">
								<div className="flex flex-col gap-2">
									<div className="flex gap-2 items-center">
										<Image src={"/mass_icon.png"} width={30} height={20} alt="" className="dark:invert"/>
										<h2 className="text-lg sm:text-xl leading-none tracking-tight">{category.name}</h2>
									</div>
									<p className="text-muted-foreground">Lo más vendido</p>
								</div>
								<Button asChild variant={"link"} className="text-lg">
									<Link href={"/"} className=""> Ver Más</Link>
								</Button>
							</div>
							<ProductsCarousel/>
						</section>
					))
				}

			</main>
		</>
	);
}