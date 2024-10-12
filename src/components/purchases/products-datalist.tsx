"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { AiOutlineLoading } from "react-icons/ai";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { Product } from "@/types"
import { useDebouncedCallback } from "use-debounce"
import { AddProductPurchaseButton } from "./add-product";
import { useCartStore } from "@/store/purchase-store";

export function ProductsDatalist() {
    const [open, setOpen] = React.useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [query, setQuery] = useState("")
    const cart = useCartStore(state => state.cart)


    const debouncedQuery = useDebouncedCallback((value: string) => { setQuery(value)}, 300)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const response = await fetch(`/api/products?query=${query}`)
                const { products } = await response.json()
                setProducts(products)
            } catch (error) {
                console.error("Error:", error)
            } finally {
                setLoading(false)
            }
        }

        if (query) fetchProducts() 

    }, [query])

    return (
        
        <Popover open={open} onOpenChange={setOpen}>
            
            <PopoverTrigger asChild>
                <Button variant={"outline"} className="w-96">
                    Agregar Producto
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-96 p-2">
                <input
                    onChange={(e) => debouncedQuery(e.target.value)}
                    type="text"
                    className="outline-none border-b focus-visible:border-black dark:focus-visible:border-primary p-2 duration-200 bg-background text-sm w-full"
                    placeholder="Buscar productos..."
                />
                <div className="flex flex-col py-2">
                    {loading ? (
                        <div className="flex-center w-full h-14">
                            <AiOutlineLoading size={18} className="animate-spin ease-in-out"/>
                        </div>
                    ) : (
                        products.map((product, index) => (
                            

                            <AddProductPurchaseButton key={index}  product={product} />
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}