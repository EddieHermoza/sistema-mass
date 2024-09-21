import { CATEGORIES } from "@/data/categories";
import { products } from "@/data/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {AddCartProductButton} from "@/components/cart/add-product-button";
import Image from "next/image";
import {SearchByName} from "@/components/filters";
import { Button } from "@/components/ui/button";
import { RxCaretLeft } from "react-icons/rx";
import FiltersContainer from "@/components/shop/filters-container";
import Link from "next/link";


export default function Page({ params }: { params: { slug: string } }) {
    const category = CATEGORIES.find((category) => category.slug === params.slug);
    const Icon = category?.icon;

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

            <section className="relative sm:container grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-7">
                    {
                        products.map((product,index)=>(
                            <article key={index} >
                                <Card className=" p-3 sm:h-80 relative flex sm:flex-col max-sm:items-center sm:justify-between max-sm:rounded-none hover:bg-muted/40 duration-200">
                                    <CardHeader className="p-0 max-sm:ml-2">
                                        <CardTitle className="text-base">{product.name}</CardTitle>
                                        <CardDescription className="text-lg">2x1</CardDescription>
                                        <span className="leading-none sm:hidden dark:text-white text-primary-foreground">S/ {product.price}</span>
                                    </CardHeader>
                                    <CardContent className="p-0 py-2 flex-center max-sm:order-first">
                                        <Image src={"/CocaColaCombo.webp"} width={160} height={160} alt="Coca Cola Combo" className="max-sm:h-24 max-sm:w-auto" />
                                    </CardContent>
                                    <CardFooter className="p-0 flex justify-between max-sm:order-last max-sm:ml-auto ">
                                        <span className="leading-none max-sm:hidden">S/ {product.price}</span>
                                        <AddCartProductButton product={product}/>
                                    </CardFooter>
                                </Card>
                            </article>
                        ))
                    }
            </section>
        </main>
    );
}