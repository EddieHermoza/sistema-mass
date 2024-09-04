'use client';
import { useState } from "react";
import { providers } from "@/data/data";
import { Provider } from "@/types/types"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit } from "react-icons/fi";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import Link from "next/link";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type SortConfig = {
    key: keyof Provider;
    order: 'asc' | 'desc';
}


export default function ProvidersTbl() {

    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', order: 'desc' });
    const [sortedProviders, setSortedProviders] = useState<Provider[]>(providers);

    const handleSort = (key: keyof Provider) => {

        const order = sortConfig.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc';

        setSortConfig({ key, order });

        const sortedData = [...providers].sort((a, b) => {

            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1;
            }

            if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1;
            }

            return 0;

        });

        setSortedProviders(sortedData);
    };

    return (
        <section className="w-full flex flex-col gap-5  bg-background" >
            <table className="table-auto text-center w-full">
                <thead className=" border-b-aorus border-b  relative text-sm lg:text-base ">
                    <tr className="h-16">
                        <td >
                            <button onClick={() => handleSort('id')} className='flex-center  gap-2 mx-auto  active:bg-pressed hover:bg-secondary p-2 rounded'>
                                <HiOutlineArrowsUpDown />
                                Id
                            </button>
                        </td>
                        <td className="text-left max-lg:hidden">
                            Ruc
                        </td>
                        <td className="sm:text-left">
                            Nombre
                        </td>
                        <td >
                            Número
                        </td>
                        <td className="max-md:hidden">
                            Correo
                        </td>
                        <td className="max-lg:hidden">
                            Web
                        </td>
                        <td className="max-xl:hidden">
                            Creado
                        </td>
                        <td className="max-xl:hidden">
                            Modificado
                        </td>
                        <td className="">

                        </td>
                    </tr>
                </thead>
                <tbody className="text-xs sm:text-sm relative">
                    {sortedProviders.map((provider, index) => (
                        <tr key={index} className="hover:bg-muted/50 duration-300 relative h-24">
                            <td className=" rounded-l-lg">
                                {provider.id}
                            </td>
                            <td className="text-left  max-lg:hidden">
                                {provider.ruc}
                            </td>
                            <td className="sm:text-left">
                                {provider.name}
                            </td>
                            <td>
                                {provider.number}
                            </td>
                            <td className="max-md:hidden">
                                {provider.email}
                            </td>
                            <td className="max-lg:hidden">
                                {provider.web}
                            </td>
                            <td className="max-xl:hidden">
                                27-06-2024
                            </td>
                            <td className="max-xl:hidden">
                                27-06-2024
                            </td>
                            <td className="rounded-r-lg space-x-2 ">
                                <Popover>
                                    <PopoverTrigger className="p-2 rounded bg-transparent hover:shadow-lg hover:shadow-secondary/50 hover:bg-background block duration-300"><MdOutlineUnfoldMore size={20} /></PopoverTrigger>
                                    <PopoverContent align="end" className="flex flex-col gap-2 items-start text-sm">
                                        <button className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full"><AiOutlineInfoCircle size={18} /> Información</button>
										<Link href={`/admin/providers/edit/${provider.id}`} className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm ">
											<FiEdit size={18} /> Editar
										</Link>
                                        <button className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full"><RiDeleteBin6Line size={18} /> Eliminar</button>
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