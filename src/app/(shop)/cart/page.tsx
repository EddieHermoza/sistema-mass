"use client"
import QuantitySelector from "@/components/cart/quantity-selector";
import { MdShoppingCart } from "react-icons/md";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardDescription,
    CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import RemoveProductButton from "@/components/cart/remove-product-button";

export default function Page() {
    const cart = useCartStore(state => state.cart)
    const cartQuantity = useCartStore(state=>state.getTotalProductsQuantity())
    const totalPrice = useCartStore(state=>state.getTotalProductsPrice())
    const totalDiscount = useCartStore(state=>state.getTotalDiscount())
    const finalPrice = useCartStore(state => state.getFinalPrice())
    return (
        <>
            <main className="relative w-full h-full flex max-xl:flex-col gap-5 p-5">
                <div className="w-full relative xl:h-[calc(100vh-120px)] flex flex-col gap-5 xl:p-5">
                    <Card className="max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-lg flex gap-2 items-center">
                                <Image src={"/mass_icon.png"} height={20} width={30} alt="" className="dark:invert"/>
                                A punto de realizar tu pedido
                            </CardTitle>
                            <CardDescription>
                                Confirma las cantidades de cada producto que desees.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="h-[600px] w-full ">
                        <CardHeader>
                            <CardTitle className="flex gap-2 items-center">
                                <MdShoppingCart size={28} />
                                Tu carrito
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="overflow-auto h-[500px] w-full scrollbar-thin scrollbar-track-background scrollbar-thumb-primary relative">
                            <table className="w-full table-auto relative divide-y-2 divide-border max-sm:w-[800px]">
                                <thead className=" sticky top-0 bg-background z-10 ">
                                    <tr className="h-16">
                                        <td className=" text-xl tracking-tight leading-none">
                                            Producto(s)
                                        </td>
                                        <td className=" text-lg tracking-tight leading-none">
                                            Cantidad
                                        </td>
                                        <td className=" text-lg tracking-tight leading-none">
                                            Precio
                                        </td>
                                        <td>

                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.length > 0  ? (
                                            cart.map((product,index)=>(
                                                <tr key={index} className="hover:bg-muted/40 duration-200">
                                                    <td className="flex gap-2 items-center h-32">
                                                        <Image src={"/CocaColaCombo.webp"} height={96} width={96} className="h-24 w-auto" alt="" />
                                                        <div className="flex flex-col gap-2">
                                                            <span className="font-semibold tracking-tight leading-none">{product.name}</span>
                                                            <span className="text-muted-foreground">2x1</span>
                                                        </div>
                                                    
                                                    </td>
                                                    <td>
                                                        <QuantitySelector product={product}/>
                                                    </td>
                                                    <td>
                                                        S/ {product.price}
                                                    </td>
                                                    <td>
                                                        <RemoveProductButton product={product}/>
                                                    </td>
                                                </tr>
                                            ))

                                        ):(
                                            <tr>
                                                <td colSpan={4} className="text-center h-32">No tiene productos en el carrito</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>   
                </div>

                <Card className="xl:h-[calc(100vh-120px)] xl:max-w-screen-xs w-full xl:border-none xl:rounded-none xl:shadow-none">
                    <CardHeader>
                        <CardTitle>
                                Detalles
                        </CardTitle>
                        <CardDescription>
                        Asegúrate de revisar todos los detalles antes de continuar con el pago.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative flex flex-col gap-10 border-t-2 border-border p-6">
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
                    </CardContent>
                    <CardFooter className="p-6 flex flex-col gap-5">
                        <Button variant={"outline"} asChild className="sm:text-lg w-full">
                            <Link href={"/"}>
                                Continuar Comprando
                            </Link>
                        </Button>
                        <Button asChild className="sm:text-lg w-full">
                            <Link href={"/checkout"}>
                                Proceder a Pagar
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

            </main>
        </>
    );
}