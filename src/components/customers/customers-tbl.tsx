'use client';
import { useState,useEffect } from "react";
import { Customer } from "@/types/types"
import { AiOutlineInfoCircle } from "react-icons/ai"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FiEdit } from "react-icons/fi";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CardContent, CardFooter } from "../ui/card";
import { Pagination } from "../ui";
import TableSkeleton from "../skeletons/table-skeleton";



type SortConfig = {
    key: keyof Customer;
    order: 'asc' | 'desc';
}

type Props = {
    query: string;
    status: string;
    page: number;
    limit: number;
}

export default function CustomersTbl({ page, limit, status, query }: Props) {

    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'id', order: 'desc' })
    const [customers, setCustomers] = useState<Customer[]>([])
    const [totalPages, settotalPages] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    const handleSort = (key: keyof Customer) => {

        const order = sortConfig.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc'

        setSortConfig({ key, order })

        const sortedData = [...customers].sort((a, b) => {

            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1
            }

            if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1
            }

            return 0

        })

        setCustomers(sortedData)
    }

    useEffect(() => {
        let delayTimeout: NodeJS.Timeout;
        const fetchCustomers = async () => {
            delayTimeout = setTimeout(() => setLoading(true), 100)
            try {
                const response = await fetch(`/api/customers?page=${page}&query=${query}&status=${status}&limit=${limit}`);
                const data = await response.json()

                settotalPages(data.totalPages)
                setCustomers(data.customers)

            } catch (error) {
                console.error("Error:", error)
            } finally {
                clearTimeout(delayTimeout)
                setLoading(false);
            }
        }

        fetchCustomers()
    }, [page, limit, query, status])

    return (
        <>
            <CardContent>
                <table className="table-auto text-center w-full">
                    <thead className=" border-b-aorus border-b  relative text-sm lg:text-base">
                        <tr className="h-16">
                            <td >
                                <button onClick={() => handleSort('id')} className='flex-center  gap-2 mx-auto active:bg-pressed hover:bg-secondary p-2 rounded'>
                                    <HiOutlineArrowsUpDown />
                                    Id
                                </button>
                            </td>
                            <td >
                                <button onClick={() => handleSort('name')} className='flex-center gap-2 mx-auto active:bg-pressed hover:bg-secondary p-2 rounded'>
                                    <HiOutlineArrowsUpDown />
                                    Nombre
                                </button>
                            </td>

                            <td className="max-lg:hidden">
                                Estado
                            </td>
                            <td className="max-md:hidden">
                                Correo
                            </td>
                            <td className="max-xl:hidden">
                                Creado
                            </td>
                            <td className="max-xl:hidden">
                                Modificado
                            </td>
                            <td>

                            </td>
                        </tr>
                    </thead>
                    <tbody className="text-xs sm:text-sm relative">
                        { loading ? (
                            <TableSkeleton rows={limit}/>
                        ):(
                            customers.length > 0 ? (
                                customers.map((customer, index) => (
                                    <tr key={index} className="hover:bg-muted/50  duration-300 relative h-24">
                                        <td className=" rounded-l-lg">
                                            {customer.id}
                                        </td>
                                        <td>
                                            {`${customer.name} ${customer.lastName}`}
                                        </td>

                                        <td className=
                                            {`max-lg:hidden text-shadow-lg ${customer.status === 1 ? 'text-green-500 shadow-green-500/50' : 'text-red-500 shadow-red-500/50'
                                                }`}
                                        >
                                            {customer.status === 1 ? 'Activo' : 'Inactivo'}
                                        </td>
                                        <td className="max-md:hidden">
                                            {customer.email}
                                        </td>
                                        <td className="max-xl:hidden">
                                            27-06-2024
                                        </td>
                                        <td className="max-xl:hidden">
                                            27-06-2024
                                        </td>
                                        <td className="rounded-r-lg space-x-2 ">
                                            <Popover>
                                                <PopoverTrigger className="p-2 rounded bg-transparent hover:shadow-lg hover:shadow-secondary/50 hover:bg-background duration-300">
                                                    <MdOutlineUnfoldMore size={20} />
                                                </PopoverTrigger>
                                                <PopoverContent align="end" className="flex flex-col gap-2 items-start text-sm">
                                                    <button className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full">
                                                        <AiOutlineInfoCircle size={18} /> 
                                                        Información
                                                    </button>
                                                    <button className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full">
                                                        <FiEdit size={18} /> 
                                                        Editar
                                                    </button>
                                                    <button className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full">
                                                        <RiDeleteBin6Line size={18} /> 
                                                        Eliminar
                                                    </button>
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