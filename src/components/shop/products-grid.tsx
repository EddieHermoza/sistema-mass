"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { AddCartProductButton } from "../cart/add-product-button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/types/product-types";
import ProductsGridSkeleton from "../skeletons/products-grid-skeleton";


type Props = {
    query: string;
    page: number;
    limit: number;
    status: string;
}

export default function ProductsGrid({ query, page, limit, status }: Props) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [totalPages, settotalPages] = useState<number>(0)


    useEffect(() => {
        let delayTimeout: NodeJS.Timeout;
        const fetchProducts = async () => {
            delayTimeout = setTimeout(() => setLoading(true), 100)
            try {
                const response = await fetch(`/api/products?page=${page}&query=${query}&limit=${limit}&status=${status}`);
                const data = await response.json()

                settotalPages(data.totalPages)
                setProducts(data.products)

            } catch (error) {
                console.error("Error:", error)
            } finally {
                clearTimeout(delayTimeout)
                setLoading(false);
            }
        }

        fetchProducts()
    }, [page, limit, query])


    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 sm:gap-5">

            {
                loading ? (
                    <ProductsGridSkeleton items={15} />
                ) : (
                    products.length > 0 ? (
                        products.map((product, index) => (
                            <article key={index} >
                                <Card className=" p-3 h-44 sm:h-80 relative flex sm:flex-col max-sm:items-center sm:justify-between max-sm:rounded-none hover:bg-muted/40 duration-200">
                                    <CardHeader className="p-0 max-sm:ml-2">
                                        <CardTitle className="text-base">{product.name}</CardTitle>
                                        <CardDescription className="text-lg">2x1</CardDescription>
                                        <span className="leading-none sm:hidden dark:text-white text-primary-foreground">S/ {product.price}</span>
                                    </CardHeader>
                                    <CardContent className="p-0 py-2 flex-center max-sm:order-first">
                                        <Image src={"/CocaColaCombo.webp"} width={160} height={160} alt="Coca Cola Combo" className="max-sm:h-24 max-sm:w-auto" />
                                    </CardContent>
                                    <CardFooter className="p-0 flex justify-between max-sm:order-last max-sm:ml-auto ">
                                        <span className="leading-none max-sm:hidden">S/ {product.price.toFixed(2)}</span>
                                        <AddCartProductButton product={product} />
                                    </CardFooter>
                                </Card>
                            </article>
                        ))
                    ) : (
                        <div className="relative h-96 col-span-5 text-center w-full">
                            No hay datos disponibles
                        </div>
                    ))
            }

        </div>
    );
}