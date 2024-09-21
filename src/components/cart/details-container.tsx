"use client"
import { useCartStore } from "@/store/cart-store";

export function CartDetails() {
    const cartQuantity = useCartStore(state=>state.getTotalProductsQuantity())
    const totalPrice = useCartStore(state=>state.getTotalProductsPrice())
    const totalDiscount = useCartStore(state=>state.getTotalDiscount())
    const finalPrice = useCartStore(state => state.getFinalPrice())

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <span className="text-lg tracking-tight leading-none">Cantidad de Productos:</span>
                <span>{cartQuantity}</span>
            </div>
            <div className="w-full flex items-center justify-between">
                <span className="text-lg tracking-tight leading-none">Total Productos:</span>
                <span>S/ {totalPrice}</span>
            </div>
            <div className="w-full flex items-center justify-between">
                <span className="text-lg tracking-tight leading-none">Total Descuento:</span>
                <span>S/ {totalDiscount}</span>
            </div>
            <div className="w-full flex items-center justify-between">
                <span className="text-lg tracking-tight leading-none">Total:</span>
                <span>S/ {finalPrice}</span>
            </div>
        </>
    );
}