"use client"
import { AiOutlineLoading } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Button } from "../ui/button";
import type { Product, ProductPurchase } from "@/types";
import { useCartStore } from "@/store/purchase-store";
import { sleep } from "@/lib/utils";
import { useState } from "react";

type Props={
	product:Product
}

export function AddProductPurchaseButton( {product} : Props )  {
	const addCartProduct = useCartStore(state => state.addProduct)


	const addToCart = async () => {

		const cartProduct : ProductPurchase ={
			id: product.id,
			name: product.name,
			price: 0,
			quantity: 1
		}

		addCartProduct(cartProduct)
	}


	return (
		<Button onClick={addToCart} variant={"ghost"} className={"w-full justify-start "}>
            {product.name}
		</Button>	
	);
}