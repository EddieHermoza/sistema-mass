
import SalesTbl from "@/components/sales/sales-tbl";
import {ToogleStatusSale} from "@/components/filters";
import {SearchByName} from "@/components/filters";
import {ToogleLimit} from "@/components/filters";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoAddCircleOutline } from "react-icons/io5";

export default function Page({searchParams}:any) {

    const query = searchParams?.query || ''
    const limit = Number(searchParams?.limit) || 5
    const currentPage = Number(searchParams?.page) || 1
    const status = searchParams?.statusSale || 'all'

    return (
        <>
            <section className="w-full flex items-end justify-between max-sm:flex-col-reverse gap-3">
                <div className="space-y-2 max-sm:w-full">
                    <SearchByName className="sm:w-96 "/>
                    <ToogleLimit/>
                    <ToogleStatusSale/>
                </div>

                <Button variant={"secondary"} asChild>
                    <Link href={"/admin/purchases/create"} className="max-sm:w-full flex gap-2 ">
                        <IoAddCircleOutline size={22}/> Registrar Compra 
                    </Link> 
                </Button>
            </section>


            <SalesTbl page={currentPage} limit={limit} query={query} status={status} />

        </>
    );
}