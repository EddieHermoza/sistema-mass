"use client"
import { useCartStore } from "@/store/purchase-store";
import { Button } from "../ui/button";
import { CiTrash } from "react-icons/ci";
import { ProductPurchase } from "@/types";

type Props={
    product:ProductPurchase
}

export default function RemoveProductPurchaseButton({product}:Props) {
    
    const removeProduct = useCartStore(state => state.removeProduct)


    return (
        <Button size={"icon"} variant={"outline"} onClick={ ()=> removeProduct(product) }>
            <CiTrash size={22}/>
        </Button>
    );
}