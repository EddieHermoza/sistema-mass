'use client'

import { useState } from "react";
import { MdRemove, MdAdd } from "react-icons/md";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCartStore } from "@/store/purchase-store";
import { ProductPurchase } from "@/types";

type Props = {
    product: ProductPurchase
}

export default function QuantityProductSelector({ product }: Props) {
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
    const [count, setCount] = useState(product.quantity)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10)

        setCount(value)
        updateProductQuantity(product, value)

    }

    const toggleCount = (value: number) => {
        const updatedCount = count + value

        setCount(updatedCount)
        updateProductQuantity(product, updatedCount)

    }

    return (
        <div className="flex flex-center gap-1 w-full">
            <Button onClick={() => toggleCount(-1)} size={"icon"} variant={"ghost"} className="h-8 w-8" disabled={count === 1}>
                <MdRemove size={18} />
            </Button>
            <Input
                type="number"
                className="w-20 text-center h-8"
                value={count}
                onChange={handleInputChange}
                min={1}
            />
            <Button onClick={() => toggleCount(1)} size={"icon"} variant={"ghost"} className="h-8 w-8">
                <MdAdd size={18} />
            </Button>
        </div>
    )
}