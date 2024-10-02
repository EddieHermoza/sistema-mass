import { CATEGORIES } from "@/data/categories";
import {SearchByName} from "@/components/filters";
import { Button } from "@/components/ui/button";
import { RxCaretLeft } from "react-icons/rx";
import FiltersContainer from "@/components/shop/filters-container";
import Link from "next/link";
import ProductsGrid from "@/components/shop/products-grid";


export default function Page({ params, searchParams }: { params: { slug: string }; searchParams:any }) {
    const category = CATEGORIES.find((category) => category.slug === params.slug);
    const Icon = category?.icon;

    const query = searchParams?.query || ''
    const limit = Number(searchParams?.limit) || 15
    const currentPage = Number(searchParams?.page) || 1
    const status = searchParams?.status || 'en'

    return (
        <main className="relative w-full flex flex-col gap-10 py-10">
            <section className="container flex sm:items-center gap-5 max-sm:flex-col">
                <Button asChild variant={"outline"} size={"icon"} className="rounded-full h-10 w-10">
                    <Link href={"/"} >
                        <RxCaretLeft size={40}/>
                    </Link>
                </Button>
                {category ? (
                    <div className="flex items-center gap-3 py-2">
                        {Icon && <Icon size={60} className=" text-primary"/>}
                        <h2 className="text-4xl">{category.name}</h2>
                    </div>
                ) : (
                    <p>Categoría no encontrada</p>
                )}
            </section>

            <section className="container">
                <FiltersContainer/>
            </section>

            <section className="container">
                <SearchByName className="focus-visible:h-14"/>
            </section>

            <section className="relative sm:container">
                    <ProductsGrid page={currentPage} limit={limit} query={query} status={status}/>
            </section>
        </main>
    );
}