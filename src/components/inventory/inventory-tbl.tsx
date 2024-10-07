'use client';
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { ProductInventory } from "@/types";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { Pagination } from "@/components/ui";
import TableSkeleton from "../skeletons/table-skeleton";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";


import { MovementDialog } from "./movement-dialog";
import { MovementForm } from "./movement-form";


type SortConfig = {
    key: keyof ProductInventory;
    order: 'asc' | 'desc';
}

type Props = {
    query: string,
    status: string,
    page: number,
    limit: number,
    productId?: string,
}

export default function InventoryTbl({ query, status, page, limit }: Props) {
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "id", order: "asc", })
    const [products, setProducts] = useState<ProductInventory[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [totalPages, settotalPages] = useState<number>(0)
    const [open, setOpen] = useState(false)
    const [productMovement, setProductMovement] = useState<ProductInventory>()
    const [refreshKey, setRefreshKey] = useState(0)

    const handleRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1)
    }

    const handleOpenChange = (newState: boolean) => {
        setOpen(newState);
    }

    const handleSort = (key: keyof ProductInventory) => {

        const order = sortConfig.key === key && sortConfig.order === 'asc' ? 'desc' : 'asc'

        setSortConfig({ key, order })

        const sortedData = [...products].sort((a, b) => {

            if (a[key] < b[key]) {
                return order === 'asc' ? -1 : 1
            }

            if (a[key] > b[key]) {
                return order === 'asc' ? 1 : -1
            }

            return 0

        });

        setProducts(sortedData)
    }

    useEffect(() => {
        let delayTimeout: NodeJS.Timeout;
        const fetchProducts = async () => {
            delayTimeout = setTimeout(() => setLoading(true), 100)
            try {
                const response = await fetch(`/api/inventory?page=${page}&query=${query}&status=${status}&limit=${limit}`);
                const { totalPages, products } = await response.json()
                settotalPages(totalPages)
                setProducts(products)

            } catch (error) {
                console.error("Error:", error)
            } finally {
                clearTimeout(delayTimeout)
                setLoading(false);
            }
        }

        fetchProducts()
    }, [page, limit, query, status,refreshKey])

    return (
        <Card x-chunk="products-table">
            <CardHeader>
                <CardTitle>Inventario</CardTitle>
                <CardDescription>Administra las entradas y salidas de tus productos.</CardDescription>
            </CardHeader>
            <CardContent>
                <table className="table-auto text-center w-full">
                    <thead className=" border-b  relative text-sm lg:text-base ">
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
                        {loading ? (
                            <TableSkeleton rows={limit} />
                        ) : (
                            products.length > 0 ? (
                                products.map((product, index) => (
                                    <tr key={index} className="hover:bg-muted/50 duration-300 relative h-24">
                                        <td className=" rounded-l-lg">
                                            {product.id}
                                        </td>
                                        <td className="text-left max-sm:text-xs">
                                            {product.name}
                                        </td>
                                        <td className=
                                            {`max-lg:hidden text-shadow-lg ${product.status ? 'text-green-500 shadow-green-500/50' : 'text-red-500 shadow-red-500/50'
                                                }`}
                                        >
                                            {product.status ? 'Activo' : 'Inactivo'}
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
                                            {product.lastStockEntry !== null ? product.lastStockEntry : "NO HAY REGISTRO"}
                                        </td>
                                        <td className="rounded-r-lg space-x-2 ">
                                            <Popover>
                                                <PopoverTrigger className="p-2 rounded bg-transparent hover:shadow-lg hover:shadow-secondary/50 hover:bg-background duration-300">
                                                    <MdOutlineUnfoldMore size={20} />
                                                </PopoverTrigger>
                                                <PopoverContent align="end" className="flex flex-col gap-2 items-start text-sm">
                                                    <button onClick={() => { setProductMovement(product), handleOpenChange(true) }} className="flex items-center gap-2 hover:bg-secondary p-2 rounded-sm w-full"><IoAddCircleOutline size={20} />Nuevo Movimiento</button>

                                                </PopoverContent>
                                            </Popover>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="relative h-24">
                                    <td colSpan={9} className="text-center py-4">No hay datos disponibles</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </CardContent>
            <CardFooter>
                <Pagination totalPages={totalPages} />
            </CardFooter>
            <MovementDialog open={open} product={productMovement} handleOpenChange={handleOpenChange}>
                <MovementForm product={productMovement} handleOpenChange={handleOpenChange} handlRefresh={handleRefresh}/>
            </MovementDialog>
        </Card>
    );
}