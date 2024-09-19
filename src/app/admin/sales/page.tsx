
import SalesTbl from "@/components/sales/sales-tbl";
import SearchByName from "@/components/filters/search-name";
import ToogleLimit from "@/components/filters/toogle-limit";
import ToogleStatusSale from "@/components/filters/toogle-status-sale";

export default function Page({searchParams}:any) {

    const query = searchParams?.query || ''
    const limit = Number(searchParams?.limit) || 5
    const currentPage = Number(searchParams?.page) || 1
    const status = searchParams?.statusSale || 'all'

    return (
        <>
            <section className="w-full flex items-end justify-between max-sm:flex-col-reverse gap-3">
                <div className="space-y-2 max-sm:w-full">
                    <SearchByName/>
                    <ToogleLimit/>
                    <ToogleStatusSale/>
                </div>
            </section>


            <SalesTbl page={currentPage} limit={limit} query={query} status={status} />

        </>
    );
}