"use client"
import { ProductsDatalist } from "@/components/purchases/products-datalist";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { MdOutlineChevronLeft } from "react-icons/md";
import { useCartStore } from "@/store/purchase-store";
import RemoveProductPurchaseButton from "@/components/purchases/remove-product";
import QuantityProductSelector from "@/components/purchases/quantity-product-selector";
import TooglePriceProduct from "@/components/purchases/toogle-price";


export default function Page() {

    const cart = useCartStore(state => state.cart)
    return (
        <>

            <section className=" w-full flex gap-5">
                <Button asChild variant={"outline"} size={"icon"}>
                    <Link href={"/admin/purchases"} ><MdOutlineChevronLeft size={25} /></Link>
                </Button>

                <h1 className="text-3xl">Nueva Compra</h1>

            </section>
            <section className="w-full flex gap-10 max-2xl:flex-col">
                <Card className="2xl:max-w-lg w-full relative">
                    <CardHeader>
                        <CardTitle>
                            Proveedor
                        </CardTitle>
                        <CardDescription>
                            Información de la compra
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="gap-7 text-sm flex 2xl:flex-col w-full">
                        <div className="flex flex-col max-2xl:w-full gap-7">
                            <label className="flex flex-col gap-2 w-full">
                                <span>Nombre Proveedor:</span>
                                <Select >
                                    <SelectTrigger className="hover:bg-secondary">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" hideWhenDetached>
                                        <SelectItem value="1">Activo</SelectItem>
                                        <SelectItem value="0">Inactivo</SelectItem>
                                    </SelectContent>
                                </Select>
                            </label>
                            <label className="flex flex-col gap-2 w-full">
                                <span>Tipo Comprobante:</span>
                                <Select >
                                    <SelectTrigger className="hover:bg-secondary">
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent position="popper" hideWhenDetached>
                                        <SelectItem value="BOLETA">Boleta</SelectItem>
                                        <SelectItem value="FACTURA">Factura</SelectItem>
                                    </SelectContent>
                                </Select>

                            </label>

                        </div>
                        <div className="flex flex-col max-2xl:w-full gap-7">
                            <label className="flex flex-col gap-2 w-full">
                                <span>No. Comprobante:</span>
                                <Input />
                            </label>

                            <label htmlFor="" className="flex flex-col gap-2 w-full ">
                                <span>Fecha Comprobante:</span>
                                <DatePicker />
                            </label>

                        </div>
                    </CardContent>
                </Card>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>
                            Detalles de la Compra
                        </CardTitle>
                        <CardDescription>

                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-10">
                        <ProductsDatalist />
                        <table className="relative w-full table-fixed text-sm text-center">
                            <thead className="border-b">
                                <tr className="h-10">
                                    <td>
                                        ID
                                    </td>
                                    <td>
                                        Producto
                                    </td>
                                    <td>
                                        Cantidad
                                    </td>
                                    <td>
                                        Precio Compra
                                    </td>
                                    <td>
                                        Importe
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.length > 0 ? (
                                        cart.map((product, index) => (
                                            <tr key={index} className="hover:bg-muted/40 duration-200 h-20">
                                                <td>
                                                    {product.id}

                                                </td>
                                                <td>
                                                    {product.name}
                                                </td>
                                                <td>
                                                    <QuantityProductSelector product={product} />
                                                </td>
                                                <td>
                                                    <TooglePriceProduct product={product} />
                                                </td>
                                                <td>
                                                    S/ {(product.quantity * product.price).toFixed(2)}
                                                </td>
                                                <td>
                                                    <RemoveProductPurchaseButton product={product} />
                                                </td>
                                            </tr>
                                        ))

                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="text-center h-20">No se agregó ningun producto</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </section>
        </>
    );
}