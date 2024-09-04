"use client";
import { products } from "@/data/data";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { Product } from "@/types/types";
import { useState } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import Link from "next/link";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

type SortConfig = {
	key: keyof Product;
	order: "asc" | "desc";
};

export default function ProductsTbl() {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: "id",
		order: "desc",
	});
	const [sortedProducts, setSortedProducts] = useState<Product[]>(products);

	const handleSort = (key: keyof Product) => {
		const order = sortConfig.key === key && sortConfig.order === "asc" ? "desc" : "asc";

		setSortConfig({ key, order });

		const sortedData = [...products].sort((a, b) => {
			if (a[key] < b[key]) {
				return order === "asc" ? -1 : 1;
			}

			if (a[key] > b[key]) {
				return order === "asc" ? 1 : -1;
			}

			return 0;
		});

		setSortedProducts(sortedData);
	};

	return (
		<section className="w-full flex flex-col gap-5 bg-background">
			<table className="table-auto text-center w-full ">
				<thead className=" border-b relative text-sm lg:text-base ">
					<tr className="h-16">
						<td>
							<button
								onClick={() => handleSort("id")}
								className="flex-center gap-2 mx-auto active:bg-pressed hover:bg-secondary p-2 rounded"
							>
								<HiOutlineArrowsUpDown />
								Id
							</button>
						</td>
						<td>
							<button
								onClick={() => handleSort("name")}
								className="flex-center gap-2 active:bg-pressed hover:bg-secondary p-2 rounded"
							>
								<HiOutlineArrowsUpDown />
								Nombre
							</button>
						</td>
						<td className="max-sm:hidden">Estado</td>
						<td className="max-sm:hidden">
							<button
								onClick={() => handleSort("price")}
								className="flex-center gap-2 mx-auto active:bg-pressed hover:bg-secondary p-2 rounded"
							>
								<HiOutlineArrowsUpDown />
								Precio
							</button>
						</td>
						<td className="max-lg:hidden">Descuento</td>
						<td className="max-lg:hidden">Creado</td>
						<td className="max-lg:hidden">Modificado</td>
						<td></td>
					</tr>
				</thead>
				<tbody className="text-sm relative">
					{sortedProducts.map((product, index) => (
						<tr
							key={index}
							className="hover:bg-muted/50  duration-300 relative h-24"
						>
							<td className=" rounded-l-lg">{product.id}</td>

							<td className="text-left max-sm:text-xs">{product.name}</td>
							<td
								className={`max-sm:hidden  text-shadow-lg ${product.status === 1
										? "text-green-500 shadow-green-500/50"
										: "text-red-500 shadow-red-500/50"
									}`}
							>
								{product.status === 1 ? "Activo" : "Inactivo"}
							</td>
							<td className="max-sm:hidden">$/ {product.price}</td>
							<td className="max-lg:hidden">$/ {product.price}</td>
							<td className="max-lg:hidden">27-06-2024</td>
							<td className="max-lg:hidden">27-06-2024</td>
							<td className="rounded-r-lg space-x-2 ">
								<Popover>
									<PopoverTrigger className="p-2 rounded bg-transparent hover:shadow-lg hover:shadow-secondary/50 hover:bg-background duration-300">
										<MdOutlineUnfoldMore size={20} />
									</PopoverTrigger>
									<PopoverContent align="end" className="flex flex-col gap-2 items-start text-sm w-auto ">
										<button className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm">
											<AiOutlineInfoCircle size={18} /> Información
										</button>
										<Link href={`/admin/products/edit/${product.id}`} className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm ">
											<FiEdit size={18} /> Editar
										</Link>
										<button className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full">
											<RiDeleteBin6Line size={18} /> Eliminar
										</button>
									</PopoverContent>
								</Popover>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}
