import Link from "next/link";
import InventoryTbl from "@/components/inventory/inventory-tbl";

import { IoAddCircleOutline } from "react-icons/io5";
import SearchByName from "@/components/filters/search-name";
import ToogleLimit from "@/components/filters/toogle-limit";
import ToogleStatus from "@/components/filters/toogle-status";
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
            </section>


            <InventoryTbl page={currentPage} limit={limit} query={query} status={status} />

        </>
    );
}