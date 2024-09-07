'use client';
import { useState,useEffect } from "react";
import { Provider } from "@/types/types"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit } from "react-icons/fi";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import Link from "next/link";
import { Pagination } from "../ui";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {CardContent,CardFooter} from "@/components/ui/card"
import TableSkeleton from "../skeletons/table-skeleton";

type SortConfig = {
    key: keyof Provider;
    order: 'asc' | 'desc';
}

type Props = {
    query: string;
    status: string;
    page: number;
    limit: number;
}

export default function ProvidersTbl({ page, limit, status, query }: Props) {

    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', order: 'desc' })
    const [providers, setProviders] = useState<Provider[]>([])
    const [totalPages, settotalPages] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    const handleSort = (key: keyof Provider) => {

        const order = sortConfig.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc'

        setSortConfig({ key, order })

        const sortedData = [...providers].sort((a, b) => {

            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1
            }

            if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1
            }

            return 0

        });

        setProviders(sortedData);
    };

    useEffect(() => {
        let delayTimeout: NodeJS.Timeout;
        const fetchProviders = async () => {
            delayTimeout = setTimeout(() => setLoading(true), 100)
            try {
                const response = await fetch(`/api/providers?page=${page}&query=${query}&status=${status}&limit=${limit}`);
                const data = await response.json()

                settotalPages(data.totalPages)
                setProviders(data.providers)

            } catch (error) {
                console.error("Error:", error)
            } finally {
                clearTimeout(delayTimeout)
                setLoading(false)
            }
        }

        fetchProviders()
        
    }, [page, limit, query, status])

    return (
        <>
            <CardContent>
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
                        {loading ? (
                            <TableSkeleton rows={limit}/>
                        ):(
                        providers.length > 0 ? (
                            providers.map((provider, index) => (
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
                                                {/* <Link href={`/admin/providers/${provider.id}`} className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm ">
                                                    <AiOutlineInfoCircle size={18} /> Información
                                                </Link> */}
                                                <Link href={`/admin/providers/edit/${provider.id}`} className="flex items-center gap-2 hover:bg-secondary p-2 w-full rounded-sm ">
                                                    <FiEdit size={18} /> Editar
                                                </Link>
                                                <button className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full"><RiDeleteBin6Line size={18} /> Eliminar</button>
                                            </PopoverContent>
                                        </Popover>
                                    </td>
                                </tr>
                            ))
                        ):(
                            <tr className="relative h-24">
                                <td colSpan={9} className="text-center py-4">No hay datos disponibles</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </CardContent>
            <CardFooter>
            <Pagination totalPages={totalPages}/>
            </CardFooter>

        </>
    );
}