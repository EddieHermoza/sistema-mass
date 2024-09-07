import Link from "next/link";
import ProductsTbl from "@/components/products/products-tbl";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { IoAddCircleOutline } from "react-icons/io5";
import ToogleStatus from "@/components/filters/toogle-status";
import SearchByName from "@/components/filters/search-name";
import ToogleLimit from "@/components/filters/toogle-limit";

export default function Page({searchParams}:any) {
    const query = searchParams?.query || ''
    const limit = Number(searchParams?.limit) || 5
    const currentPage = Number(searchParams?.page) || 1
    const status = searchParams?.status || 'all'

    return (
        <>
            <section className="w-full flex items-end justify-between max-sm:flex-col-reverse gap-3">
                <div className="space-y-2 max-sm:w-full">
                    <SearchByName/>
                    <ToogleLimit/>
                    <ToogleStatus/>
                </div>

                <Link href={"/admin/products/create"} className="max-sm:w-full bg-black dark:bg-primary dark:hover:bg-primary/80 hover:bg-black/80 py-2 px-4 rounded text-white dark:text-primary-foreground flex-center gap-2 duration-200 focus:ring ring-ring ring-offset-2">
                    <IoAddCircleOutline size={22}/> Agregar Producto 
                </Link>
            </section>
            
            <Card x-chunk="products-table">
                <CardHeader>
                    <CardTitle>Productos</CardTitle>
                    <CardDescription>Administra tus productos y visualiza su rendimiento de ventas.</CardDescription>
                </CardHeader>
                <ProductsTbl page={currentPage} limit={limit} query={query} status={status} />

            </Card>
        </>
    );
}