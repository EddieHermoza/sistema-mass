'use client';
import { products } from "@/data/data";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { Product } from "@/types/types";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type SortConfig = {
    key: keyof Product;
    order: 'asc' | 'desc';
}

export default function InventoryTbl() {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', order: 'desc' });
    const [sortedProducts, setSortedProducts] = useState<Product[]>(products);

    const handleSort = (key: keyof Product) => {

        const order = sortConfig.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc';

        setSortConfig({ key, order });

        const sortedData = [...products].sort((a, b) => {

            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1;
            }

            if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1;
            }

            return 0;

        });

        setSortedProducts(sortedData);
    };
    return (
        <section className="w-full flex flex-col gap-5 bg-background">
            <table className="table-auto text-center w-full">
                <thead className=" border-b-aorus border-b  relative text-sm lg:text-base ">
                    <tr className="h-16">
                        <td >
                            <button onClick={() => handleSort('id')} className='flex-center gap-2 mx-auto active:bg-pressed hover:bg-secondary p-2 rounded'>
                                <HiOutlineArrowsUpDown />
                                Id
                            </button>
                        </td>
                        <td>
                            <button onClick={() => handleSort('name')} className='flex-center gap-2 active:bg-pressed hover:bg-secondary p-2 rounded'>
                                <HiOutlineArrowsUpDown />
                                Nombre
                            </button>
                        </td>
                        <td className="max-lg:hidden">
                            Estado
                        </td>
                        <td>
                            <button onClick={() => handleSort('stock')} className='flex-center gap-2 mx-auto active:bg-pressed hover:bg-secondary p-2 rounded'>
                                <HiOutlineArrowsUpDown />
                                Stock
                            </button>
                        </td>
                        <td className="max-lg:hidden">
                            Ultimo Ingreso
                        </td>
                        <td >
                        </td>
                    </tr>
                </thead>
                <tbody className="text-sm relative">
                    {sortedProducts.map((product, index) => (
                        <tr key={index} className="hover:bg-muted/50 duration-300 relative h-24">
                            <td className=" rounded-l-lg">
                                {product.id}
                            </td>
                            <td className="text-left max-sm:text-xs">
                                {product.name}
                            </td>
                            <td className=
                                {`max-lg:hidden text-shadow-lg ${product.status === 1 ? 'text-green-500 shadow-green-500/50' : 'text-red-500 shadow-red-500/50'
                                    }`}
                            >
                                {product.status === 1 ? 'Activo' : 'Inactivo'}
                            </td>
                            <td className=
                                {`text-shadow-lg ${product.stock < 5 ? 'text-red-500 shadow-red-500/50'
                                        : product.stock <= 10 ? 'text-yellow-500 shadow-yellow-500/50'
                                            : 'text-green-500 shadow-green-500/50'
                                    }`}
                            >
                                {product.stock}
                            </td>
                            <td className="max-lg:hidden">
                                27-06-2024
                            </td>
                            <td className="rounded-r-lg space-x-2 ">
                                <Popover>
                                    <PopoverTrigger className="p-2 rounded bg-transparent hover:shadow-lg hover:shadow-secondary/50 hover:bg-background duration-300">
                                        <MdOutlineUnfoldMore size={20} />
                                    </PopoverTrigger>
                                    <PopoverContent align="end" className="flex flex-col gap-2 items-start text-sm">
                                        <button className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full"><IoAddCircleOutline size={18} /> Agregar</button>
                                        <button className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full"><IoRemoveCircleOutline size={18} /> Remover</button>
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