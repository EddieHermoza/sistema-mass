'use client';

import { ProductPurchase } from "@/types";
import { Input } from "../ui/input";
import { useCartStore } from "@/store/purchase-store";
import { useState } from "react";

type Props = {
    product: ProductPurchase
}

export default function TooglePriceProduct({ product }: Props) {
    const updateProductPrice = useCartStore(state => state.updateProductPrice)
    const [price, setPrice] = useState<number>(product.price)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)

        if (!isNaN(value)) {
            setPrice(value)
            updateProductPrice(product, value)
        }
    }

    return (
        <div className="flex-center w-full">
            <Input
                type="number"
                className="w-24 text-center h-8"
                value={price}
                onChange={handleInputChange}
                min={1}
                step={0.01}
            />
        </div>
    );
}